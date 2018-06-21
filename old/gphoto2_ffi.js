var ref = require("ref");
var ArrayType = require("ref-array");
var Struct = require("ref-struct");
var ffi = require("ffi");

var RefT = ref.refType;

var GPContext = RefT("void");
var CameraList = RefT("void");
var Camera = RefT("void");
var CameraFile = RefT("void");
var CameraWidget = RefT("void");
var CameraWidgetType = ref.types.int;

var CameraFilePath = Struct({
    name: ArrayType(ref.types.uchar, 128),
    folder: ArrayType(ref.types.uchar, 1024)
});

var CameraText = Struct({
    text: ArrayType(ref.types.char, 32 * 1024)
});

module.exports.GPContext =          GPContext;
module.exports.CameraList =         CameraList;
module.exports.Camera =             Camera;
module.exports.CameraFile =         CameraFile;
module.exports.CameraWidget =       CameraWidget;
module.exports.CameraWidgetType =   RefT("int");
module.exports.CameraFilePath =     CameraFilePath;
module.exports.CameraText =         CameraText;


var gphoto2 = ffi.Library("libgphoto2", {
    "gp_context_new":       [GPContext, []],
    "gp_context_unref":     ["void", [GPContext]],

    "gp_port_result_as_string":     ["string", ["int"]],

    "gp_list_new":          ["int", [RefT(CameraList)]],
    "gp_list_ref":          ["int", [CameraList]],
    "gp_list_unref":        ["int", [CameraList]],
    "gp_list_free":         ["int", [CameraList]],
    "gp_list_count":        ["int", [CameraList]],
    "gp_list_append":       ["int", [CameraList, "string", "string"]],
    "gp_list_reset":        ["int", [CameraList]],
    "gp_list_sort":         ["int", [CameraList]],
    "gp_list_find_by_name": ["int", [CameraList, "int*", "string"]],
    "gp_list_get_name":     ["int", [CameraList, "int", RefT("string")]],
    "gp_list_get_value":    ["int", [CameraList, "int", RefT("string")]],
    "gp_list_set_name":     ["int", [CameraList, "int", "string"]],
    "gp_list_set_value":    ["int", [CameraList, "int", "string"]],
    // "gp_list_populate":     ["int", [RefCameraList, "string", "int"]],

    "gp_camera_autodetect": ["int", [CameraList, GPContext]],

    "gp_camera_new":        ["int", [RefT(Camera)]],
    "gp_camera_init":       ["int", [Camera, GPContext]],
    "gp_camera_exit":       ["int", [Camera, GPContext]],
    "gp_camera_ref":        ["int", [Camera]],
    "gp_camera_unref":      ["int", [Camera]],
    "gp_camera_free":       ["int", [Camera]],

    "gp_camera_get_config": ["int", [Camera, RefT(CameraWidget), GPContext]],
    "gp_camera_list_config": [
        "int", [Camera, CameraList, GPContext]
    ],

    // TODO - camera
    "gp_camera_get_single_config": [
        "int", [Camera, "string", RefT(CameraWidget), GPContext]
    ],
    "gp_camera_set_config": [
        "int", [Camera, CameraWidget, GPContext]
    ],
    "gp_camera_set_single_config": [
        "int", [Camera, "string", CameraWidget, GPContext]
    ],
    "gp_camera_get_summary":    ["int", [Camera, CameraText, GPContext]],
    "gp_camera_get_manual":     ["int", [Camera, CameraText, GPContext]],
    "gp_camera_get_about":      ["int", [Camera, CameraText, GPContext]],

    "gp_camera_capture": [
        "int", [Camera, "int", RefT(CameraFilePath), GPContext]
    ],
    "gp_camera_trigger_capture":    ["int", [Camera, GPContext]],
    "gp_camera_capture_preview":    ["int", [Camera, CameraFile, GPContext]],

// TODO - check widget
// TODO - NewWidget ?

    "gp_widget_new": [
        "int", [CameraWidgetType, "string", RefT(CameraWidget)]
    ],
    "gp_widget_free":           ["int", [CameraWidget]],
    "gp_widget_ref":            ["int", [CameraWidget]],
    "gp_widget_unref":          ["int", [CameraWidget]],

    "gp_widget_append":         ["int", [CameraWidget, CameraWidget]],
    "gp_widget_prepend":        ["int", [CameraWidget, CameraWidget]],
    "gp_widget_count_children": ["int", [CameraWidget]],

    "gp_widget_get_child": [
        "int", [CameraWidget, "int", RefT(CameraWidget)]
    ],
    "gp_widget_get_child_by_label": [
        "int", [CameraWidget, "string", RefT(CameraWidget)]
    ],
    "gp_widget_get_child_by_id": [
        "int", [CameraWidget, "int", RefT(CameraWidget)]
    ],
    "gp_widget_get_child_by_name": [
        "int", [CameraWidget, "string", RefT(CameraWidget)]
    ],
    "gp_widget_get_root":   ["int", [CameraWidget, RefT(CameraWidget)]],
    "gp_widget_get_parent": ["int", [CameraWidget, RefT(CameraWidget)]],

    "gp_widget_set_value":  ["int", [CameraWidget, "pointer"]],
    "gp_widget_get_value":  ["int", [CameraWidget, "pointer"]],
    "gp_widget_set_name":   ["int", [CameraWidget, "string"]],
    "gp_widget_get_name":   ["int", [CameraWidget, RefT("string")]],
    "gp_widget_set_info":   ["int", [CameraWidget, "string"]],
    "gp_widget_get_info":   ["int", [CameraWidget, RefT("string")]],
    "gp_widget_get_id":     ["int", [CameraWidget, RefT("int")]],
    "gp_widget_get_type":   ["int", [CameraWidget, RefT(CameraWidgetType)]],
    "gp_widget_get_label":  ["int", [CameraWidget, RefT("string")]],
    "gp_widget_set_range":  ["int", [CameraWidget, "float", "float", "float"]],
    "gp_widget_get_range":  [
        "int", [CameraWidget, RefT("float"), RefT("float"), RefT("float")]
    ],
    "gp_widget_add_choice":     ["int", [CameraWidget, "string"]],
    "gp_widget_count_choices":  ["int", [CameraWidget]],
    "gp_widget_get_choice":     ["int", [CameraWidget, "int", RefT("string")]],
    "gp_widget_set_changed":    ["int", [CameraWidget, "int"]],
    "gp_widget_changed":        ["int", [CameraWidget]],
    "gp_widget_set_readonly":   ["int", [CameraWidget, "int"]],
    "gp_widget_get_readonly":   ["int", [CameraWidget, RefT("int")]],

    "gp_file_new":          ["int", [RefT(CameraFile)]],
    "gp_camera_file_get":   [
        "int", [CameraFile, "string", "string", "int", CameraFile, GPContext]
    ],
    "gp_file_save":         ["int", [CameraFile, "string"]],
    "gp_file_unref":        ["int", [CameraFile]],
} );

module.exports = Object.assign(module.exports, gphoto2);
