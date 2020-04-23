import {refType, types} from "ref-napi";
import * as ArrayType from "ref-array-napi";
import * as StructType from "ref-struct-napi";
import {GPCameraCaptureType, GPCameraFileType, GPCodes, PointerOf} from "../types";
import {IStructBuffer} from "../types/IStructBuffer";
import {StructCameraAbilities} from "./GPAbilitiesListModule";
import {PointerContext, RefContext} from "./GPContextModule";
import {PointerList, RefList} from "./GPListModule";
import {PointerPortInfo, RefPortInfo} from "./GPPortInfoModule";
import {PointerCameraWidget, RefCameraWidget} from "./GPWidgetModule";

/**
 *
 */
export type PointerCamera = PointerOf<void>;

/**
 *
 */
// tslint:disable-next-line
export const RefCamera = refType("void");

/**
 *
 */
export type PointerCameraFile = PointerOf<void>;

/**
 *
 */
// tslint:disable-next-line
export const RefCameraFile = refType("void");

/**
 *
 */
export type StructCameraText = StructType & {text: PointerOf<string> & IStructBuffer};
/**
 *
 * @type {StructType}
 */
// tslint:disable-next-line
export const StructCameraText = StructType({
  text: ArrayType(types.char, 32 * 1024)
});

/**
 *
 */
export type StructCameraFilePath = StructType & {
  name: PointerOf<string> & IStructBuffer;
  folder: PointerOf<string> & IStructBuffer;
  ref(): PointerOf<StructCameraFilePath>;
};
/**
 *
 * @type {StructType}
 */
// tslint:disable-next-line
export const StructCameraFilePath = StructType({
  name: ArrayType(types.uchar, 128),
  folder: ArrayType(types.uchar, 1024)
});

export const GP_CAMERA_MODULE_ASYNC_KEYS: string[] = [
  "gp_camera_capture",
  "gp_camera_capture_preview",
  "gp_camera_trigger_capture",
  "gp_camera_file_get"
];

/**
 *
 * @type {any}
 */
// tslint:disable-next-line
export const GPCameraModuleDescription = {
  gp_camera_autodetect: ["int", [RefList, RefContext]],
  gp_camera_new: ["int", [refType(RefCamera)]],
  gp_camera_init: ["int", [RefCamera, RefContext]],
  gp_camera_exit: ["int", [RefCamera, RefContext]],
  gp_camera_ref: ["int", [RefCamera]],
  gp_camera_unref: ["int", [RefCamera]],
  gp_camera_free: ["int", [RefCamera]],
  gp_camera_get_config: ["int", [RefCamera, refType(RefCameraWidget), RefContext]],
  gp_camera_list_config: ["int", [RefCamera, RefList, RefContext]],
  gp_camera_get_single_config: ["int", [RefCamera, types.CString, refType(RefCameraWidget), RefContext]],
  gp_camera_set_config: ["int", [RefCamera, RefCameraWidget, RefContext]],
  gp_camera_set_single_config: ["int", [RefCamera, types.CString, RefCameraWidget, RefContext]],
  gp_camera_get_summary: ["int", [RefCamera, refType(StructCameraText), RefContext]],
  gp_camera_get_manual: ["int", [RefCamera, refType(StructCameraText), RefContext]],
  gp_camera_get_about: ["int", [RefCamera, refType(StructCameraText), RefContext]],
  gp_camera_get_storageinfo: ["int", [RefCamera, refType(refType("void")), refType("void"), RefContext]],

  gp_camera_capture: ["int", [RefCamera, "int", refType(StructCameraFilePath), RefContext]],
  gp_camera_trigger_capture: ["int", [RefCamera, RefContext]],
  gp_camera_capture_preview: ["int", [RefCamera, RefCameraFile, RefContext]],
  gp_camera_file_get: ["int", [RefCameraFile, types.CString, types.CString, "int", RefCameraFile, RefContext]],

  gp_camera_set_abilities: ["int", [RefCamera, refType(StructCameraAbilities)]],
  gp_camera_get_abilities: ["int", [RefCamera, refType(StructCameraAbilities)]],
  gp_camera_set_port_info: ["int", [RefCamera, RefPortInfo]],
  gp_camera_get_port_info: ["int", [RefCamera, RefPortInfo]]
};

export interface IGPCameraModule {
  /**
   * Autodetect all detectable camera
   *
   * This camera will autodetected all cameras that can be autodetected.
   * This will for instance detect all USB cameras.
   *
   *   CameraList *list;
   *   gp_list_new (&list);
   *   gp_camera_autodetect (list, context);
   *   ... done! ...
   *
   * @param cameraList a #CameraList that receives the autodetected cameras
   * @param context a #GPContext
   * @return the number of cameras detected (0 to n) or a gphoto2 error code (<0)
   *
   */
  gp_camera_autodetect(cameraList: PointerList, context: PointerContext): GPCodes;

  /**
   * Allocates the memory for a #Camera.
   *
   * @param camera the #Camera object to initialize.
   * @return a gphoto2 error code
   *
   */
  gp_camera_new(camera: PointerOf<PointerCamera>): GPCodes;

  /**
   *
   * @param {PointerCamera} camera
   * @param {PointerPortInfo} portInfo
   */
  gp_camera_set_port_info(camera: PointerCamera, portInfo: PointerPortInfo): void;

  /**
   *
   * @param camera
   * @param portInfo
   */
  gp_camera_get_port_info(camera: PointerCamera, portInfo: PointerPortInfo): void;

  /**
   * Sets the camera abilities.
   *
   * @param camera a #Camera
   * @param abilities the #CameraAbilities to be set
   * @return a gphoto2 error code
   *
   * You need to call this function before calling #gp_camera_init the
   * first time unless you want gphoto2 to autodetect cameras and choose
   * the first detected one. By setting the abilities, you
   * tell gphoto2 what model the camera is and what camera driver should
   * be used for accessing the camera. You can get abilities by calling
   * #gp_abilities_list_get_abilities.
   *
   */
  gp_camera_set_abilities(camera: PointerCamera, abilities: PointerOf<StructCameraAbilities>): GPCodes;

  /**
   * Gets the camera abilities.
   *
   * @param camera a #Camera
   * @param abilities
   * @return a gphoto2 error code
   */
  gp_camera_get_abilities(camera: PointerCamera, abilities: PointerOf<StructCameraAbilities>): GPCodes;

  /**
   * Initiate a connection to the camera.
   *
   * Before calling this function, the camera should be set up using gp_camera_set_port_path() or
   * gp_camera_set_port_name() and gp_camera_set_abilities(). If that has been
   * omitted, gphoto2 tries to autodetect any cameras and chooses the first one
   * if any cameras are found. It is generally a good idea to call
   * gp_camera_exit() after transactions have been completed in order to give
   * other applications the chance to access the camera, too.
   *
   * @param camera a #Camera
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   */
  gp_camera_init(camera: PointerCamera, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_exit(camera: PointerCamera, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @returns {GPCodes}
   */
  gp_camera_ref(camera: PointerCamera): GPCodes;

  /**
   * Decrements the reference count of a #Camera.
   *
   * @param camera a #Camera
   * @return a gphoto2 error code
   *
   * If the reference count reaches %0, the camera will be freed
   * automatically.
   *
   */
  gp_camera_unref(camera: PointerCamera): GPCodes;

  /**
   * Free the camera.
   *
   * @param camera a #Camera
   * @return a gphoto2 error code
   * @deprecated This function should never be used. Please use #gp_camera_unref instead.
   */
  gp_camera_free(camera: PointerCamera): GPCodes;

  /**
   * Retrieve a configuration window for the camera.
   *
   * This window can be used for construction of a configuration dialog.
   *
   * @param camera a #Camera
   * @param window a #CameraWidget
   * @param context a #GPContext
   * @return gphoto2 error code
   *
   */
  gp_camera_get_config(camera: PointerCamera, window: PointerOf<PointerCameraWidget>, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param cameraList
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_list_config(camera: PointerCamera, cameraList: PointerList, context: PointerContext): GPCodes;

  /**
   * Retrieve a single configuration widget for the camera.
   *
   * This widget will then contain the current and the possible values and the type.
   *
   * @param camera a Camera
   * @param {string} name the path of a configuration widget
   * @param {Buffer} buffer
   * @param context
   * @returns {GPCodes} gphoto2 error code
   */
  gp_camera_get_single_config(
    camera: PointerCamera,
    name: string,
    buffer: PointerOf<PointerCameraWidget>,
    context: PointerContext
  ): GPCodes;

  /**
   * Sets the configuration.
   *
   * @param camera a #Camera
   * @param window a #CameraWidget
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * Typically, a window is retrieved using #gp_camera_get_config and passed
   * to this function in order to adjust the settings on the camera.
   *
   **/
  gp_camera_set_config(camera: PointerCamera, window: PointerCameraWidget, context: PointerContext): GPCodes;

  /**
   * Set a single configuration widget for the camera.
   *
   * @param camera a #Camera
   * @param name the path of a configuration widget
   * @param widget a #CameraWidget
   * @param context a #GPContext
   * @return gphoto2 error code
   *
   * This widget contains the new value of the widget to set.
   *
   */
  gp_camera_set_single_config(camera: PointerCamera, name: string, widget: PointerCameraWidget, context: PointerContext): GPCodes;

  /**
   * Retrieves a camera summary.
   *
   * @param camera a #Camera
   * @param summary a #CameraText
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * This summary typically contains information like manufacturer, pictures
   * taken, or generally information that is not configurable.
   *
   **/
  gp_camera_get_summary(camera: PointerCamera, summary: PointerOf<StructCameraText>, context: PointerContext): GPCodes;

  /**
   * Retrieves the manual for given camera.
   *
   * @param camera a #Camera
   * @param manual a #CameraText
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * This manual typically contains information about using the camera.
   *
   **/
  gp_camera_get_manual(camera: PointerCamera, manual: PointerOf<StructCameraText>, context: PointerContext): GPCodes;

  /**
   * Retrieves information about the camera driver.
   *
   * @param camera a #Camera
   * @param about a #CameraText
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * Typically, this information contains path and address of the author,
   * acknowledgements, etc.
   *
   */
  gp_camera_get_about(camera: PointerCamera, about: PointerOf<StructCameraText>, context: PointerContext): GPCodes;

  /**
   * Gets information on the camera attached storage.
   *
   * @param camera a #Camera
   * @param sifs Pointer to receive a pointer to/array of storage info items
   * @param nrofsifs Pointer to receive number of array entries
   * @param context a #GPContext
   * @returns a gphoto2 error code
   *
   * Retrieves the storage information, like maximum and free space, for
   * the specified filesystem, if supported by the device. The storage
   * information is returned in an newly allocated array of
   * #CameraStorageInformation objects, to which the pointer pointed to
   * by #sifs will be set.
   *
   * The variable pointed to by #nrofsifs will be set to the number of
   * elements in that array.
   *
   * It is the caller's responsibility to free the memory of the array.
   *
   */
  gp_camera_get_storageinfo(camera: PointerCamera, sifs: any, nrofsifs: any, context: PointerContext): GPCodes;

  /**
   * Captures an image, movie, or sound clip depending on the given type.
   *
   * @param camera a #Camera
   * @param type a #CameraCaptureType
   * @param path a #CameraFilePath
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * The resulting file will be stored on the camera. The location gets stored
   * in path. The file can then be downloaded using #gp_camera_file_get.
   *
   */
  gp_camera_capture(
    camera: PointerCamera,
    type: GPCameraCaptureType,
    path: PointerOf<StructCameraFilePath>,
    context: PointerContext
  ): GPCodes;

  /**
   * Captures an image, movie, or sound clip depending on the given type.
   *
   * @param camera a #Camera
   * @param type a #CameraCaptureType
   * @param path a #CameraFilePath
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * The resulting file will be stored on the camera. The location gets stored
   * in path. The file can then be downloaded using #gp_camera_file_get.
   *
   */
  gp_camera_capture_async(
    camera: PointerCamera,
    type: GPCameraCaptureType,
    path: PointerOf<StructCameraFilePath>,
    context: PointerContext
  ): Promise<GPCodes>;

  /**
   * Triggers capture of one or more images.
   *
   * @param camera a #Camera
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * This functions just remotely causes the shutter release and returns
   * immediately. You will want to run #gp_camera_wait_event until a image
   * is added which can be downloaded using #gp_camera_file_get.
   */
  gp_camera_trigger_capture(camera: PointerCamera, context: PointerContext): GPCodes;

  /**
   * Triggers capture of one or more images.
   *
   * @param camera a #Camera
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * This functions just remotely causes the shutter release and returns
   * immediately. You will want to run #gp_camera_wait_event until a image
   * is added which can be downloaded using #gp_camera_file_get.
   */
  gp_camera_trigger_capture_async(camera: PointerCamera, context: PointerContext): Promise<GPCodes>;

  /**
   * Captures a preview that won't be stored on the camera but returned in
   * supplied file.
   *
   * @param camera a #Camera
   * @param file a #CameraFile
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * For example, you could use gp_capture_preview() for taking some sample
   * pictures before calling gp_capture().
   *
   */
  gp_camera_capture_preview(camera: PointerCamera, file: PointerCameraFile, context: PointerContext): GPCodes;

  /**
   * Captures a preview that won't be stored on the camera but returned in
   * supplied file.
   *
   * @param camera a #Camera
   * @param file a #CameraFile
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   * For example, you could use gp_capture_preview() for taking some sample
   * pictures before calling gp_capture().
   *
   */
  gp_camera_capture_preview_async(camera: PointerCamera, file: PointerCameraFile, context: PointerContext): Promise<GPCodes>;

  /**
   * Retrieves a file from the #Camera.
   *
   * @param camera a #Camera
   * @param folder a folder
   * @param file the path of a file
   * @param type the #CameraFileType
   * @param cameraFile a #CameraFile
   * @param context a #GPContext
   * @return a gphoto2 error code
   *
   **/
  gp_camera_file_get(
    camera: PointerCamera,
    folder: string,
    file: string,
    type: GPCameraFileType,
    cameraFile: PointerCameraFile,
    context: PointerContext
  ): GPCodes;

  /**
   *
   * @param {PointerCamera} camera
   * @param {string} folder
   * @param {string} file
   * @param {GPCameraFileType} type
   * @param {PointerCameraFile} cameraFile
   * @param {PointerContext} context
   * @returns {Promise<GPCodes>}
   */
  gp_camera_file_get_async(
    camera: PointerCamera,
    folder: string,
    file: string,
    type: GPCameraFileType,
    cameraFile: PointerCameraFile,
    context: PointerContext
  ): Promise<GPCodes>;
}
