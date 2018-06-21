var ref = require("ref");
var lib = require("../gphoto2");
var get_config = require("../get_config");

function use_camera(context, camera, dest_path)
{
    pathPtr = ref.alloc(lib.CameraFilePath);
    //path = new lib.StructCameraFilePath

    var res = lib.gp_camera_capture(camera, lib.GP_CAPTURE_IMAGE, pathPtr, context);
    if (res < 0)
    {
        console.log("Could not capture image:\n" + lib.gp_port_result_as_string(res));
        return (-1);
    }
    path_folder = pathPtr.deref().folder.buffer.readCString(0);
    path_name = pathPtr.deref().name.buffer.readCString(0);
    console.log("Photo temporarily saved in " + path_folder + path_name);

    var destPtr = ref.alloc(lib.CameraFile);
    if (lib.gp_file_new(destPtr) < 0)
        return -1;
    var dest = destPtr.deref();
    res = lib.gp_camera_file_get(camera, path_folder, path_name,
        lib.GP_FILE_TYPE_NORMAL, dest, context);
    if (res < 0)
    {
        console.log("Could not load image:\n" +
            lib.gp_port_result_as_string(res));
        return (-1);
    }

    res = lib.gp_file_save(dest, dest_path);
    if (res < 0)
    {
        console.log("Could not save image in " + dest_path + ":\n" +
            lib.gp_port_result_as_string(res));
        return (-1);
    }
    console.log("Image saved in " + dest_path);
    lib.gp_file_unref(dest);

    return 0;
}

var TAKE_PHOTOS = false;

function main()
{
    var context = lib.gp_context_new()

    if (context.isNull())
        return 1;

    var cameraInfos = lib.NewList();

    if (lib.gp_camera_autodetect(cameraInfos, context) < 0)
        return 1;
    console.log(lib.gp_list_count(cameraInfos) + " cameras detected");
    lib.gp_list_unref(cameraInfos);

    var cameraPtr = ref.alloc(lib.Camera);
    if (lib.gp_camera_new(cameraPtr) < 0)
        return -1;
    var camera = cameraPtr.deref();
    if (lib.gp_camera_init(camera, context) < 0)
    {
        console.log("Could not initialize camera\n");
        return -1;
    }

    var configPtr = ref.alloc(lib.CameraWidget);
    lib.gp_camera_get_config(camera, configPtr, context);
    configValue = get_config.getWidgetValue(configPtr.deref());
    console.log(configValue);

    if (TAKE_PHOTOS) {
        for (var i = 0; i < 10; i++) {
            res = use_camera(context, camera, "my_photo_" + i + ".cr2");
            if (res < 0)
            return res;
        }
    }

    lib.gp_camera_exit(camera, context);
    lib.gp_camera_unref(camera);

    lib.gp_context_unref(context);

    return 0;
}

console.log("main returned: " + main());
