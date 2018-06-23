import {refType, types} from "ref";
import * as ArrayType from "ref-array";
import * as StructType from "ref-struct";
import {GPCaptureTypes, GPCodes, PointerOf, Ref} from "../types";
import {PointerContext, RefContext} from "./GPContextModule";
import {PointerCameraWidget, RefCameraWidget} from "./GPWidgetModule";
/**
 *
 */
export type PointerCamera = PointerOf<void>;

/**
 *
 */
export const RefCamera = Ref;

/**
 *
 */
export type PointerCameraList = PointerOf<void>;

/**
 *
 */
export const RefCameraList = Ref;
/**
 *
 */
export type PointerCameraFile = PointerOf<void>;

/**
 *
 */
export const RefCameraFile = Ref;

/**
 *
 */
export type PointerCameraText = PointerOf<void>;

/**
 *
 */
export type StructCameraText = StructType & { text: PointerOf<string> };
/**
 *
 * @type {StructType}
 */
export const StructCameraText = StructType({
  text: ArrayType(types.char, 32 * 1024)
});
/**
 *
 */
export type PointerCameraFilePath = PointerOf<void>;
/**
 *
 */
export type StructCameraFilePath = StructType & {
  name: PointerOf<string>;
  folder: PointerOf<string>
};
/**
 *
 * @type {StructType}
 */
export const StructCameraFilePath = StructType({
  name: ArrayType(types.uchar, 128),
  folder: ArrayType(types.uchar, 1024)
});

/**
 *
 * @type {any}
 */
export const GPCameraModuleDescription = {
  gp_camera_autodetect: ["int", [RefCameraList, RefContext]],
  gp_camera_new: ["int", [refType(RefCamera)]],
  gp_camera_init: ["int", [RefCamera, RefContext]],
  gp_camera_exit: ["int", [RefCamera, RefContext]],
  gp_camera_ref: ["int", [RefCamera]],
  gp_camera_unref: ["int", [RefCamera]],
  gp_camera_free: ["int", [RefCamera]],
  gp_camera_get_config: ["int", [RefCamera, refType(RefCameraWidget), RefContext]],
  gp_camera_list_config: ["int", [RefCamera, RefCameraList, RefContext]],
  gp_camera_get_single_config: ["int", [RefCamera, types.CString, refType(RefCameraWidget), RefContext]],
  gp_camera_set_config: ["int", [RefCamera, RefCameraWidget, RefContext]],
  gp_camera_set_single_config: ["int", [RefCamera, types.CString, RefCameraWidget, RefContext]],
  gp_camera_get_summary: ["int", [RefCamera, StructCameraText, RefContext]],
  gp_camera_get_manual: ["int", [RefCamera, StructCameraText, RefContext]],
  gp_camera_get_about: ["int", [RefCamera, StructCameraText, RefContext]],
  gp_camera_capture: ["int", [RefCamera, "int", refType(StructCameraFilePath), RefContext]],
  gp_camera_trigger_capture: ["int", [RefCamera, RefContext]],
  gp_camera_capture_preview: ["int", [RefCamera, RefCameraFile, RefContext]],
  gp_camera_file_get: ["int", [RefCameraFile, types.CString, types.CString, "int", RefCameraFile, RefContext]]
};

export interface IGPCameraModule {
  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_autodetect(cameraList: PointerCameraList, context: PointerContext): GPCodes;

  /**
   *
   * @param {Buffer} buffer
   * @returns {GPCodes}
   */
  gp_camera_new(buffer: PointerOf<PointerCamera>): GPCodes;

  /**
   *
   * @param camera
   * @param {PointerContext} context
   * @returns {GPCodes}
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
   *
   * @param camera
   * @returns {GPCodes}
   */
  gp_camera_unref(camera: PointerCamera): GPCodes;

  /**
   *
   * @param camera
   * @returns {GPCodes}
   */
  gp_camera_free(camera: PointerCamera): GPCodes;

  /**
   * Retrieve a configuration window for the camera.
   * @returns {GPCodes}
   */
  gp_camera_get_config(camera: PointerCamera, buffer: PointerOf<PointerCameraWidget>, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param cameraList
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_list_config(camera: PointerCamera, cameraList: PointerCameraList, context: PointerContext): GPCodes;

  /**
   * Retrieve a single configuration widget for the camera.
   *
   * This widget will then contain the current and the possible values and the type.
   *
   * @param camera a Camera
   * @param {string} name the name of a configuration widget
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
   *
   * @param camera
   * @param cameraWidget
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_set_config(camera: PointerCamera, cameraWidget: PointerCameraWidget, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param {string} value
   * @param cameraWidget
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_set_single_config(camera: PointerCamera, value: string, cameraWidget: PointerCameraWidget, context: PointerContext): GPCodes;

  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_get_summary(camera: PointerCamera, cameraText: PointerCameraText, context: PointerContext): GPCodes;

  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_get_manual(camera: PointerCamera, cameraText: PointerCameraText, context: PointerContext): GPCodes;

  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_get_about(camera: PointerCamera, cameraText: PointerCameraText, context: PointerContext): GPCodes;

  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_capture(
    camera: PointerCamera,
    cameraCaptureType: number,
    path: PointerOf<PointerCameraFilePath>,
    context: PointerContext
  ): GPCodes;

  /**
   *
   * @returns {GPCodes}
   */
  gp_camera_trigger_capture(camera: PointerCamera, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param {Buffer} path
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_camera_capture_preview(camera: PointerCamera, path: PointerCameraFile, context: PointerContext): GPCodes;

  /**
   *
   * @param camera
   * @param {PointerCameraFile} cameraFile
   * @param path
   * @param filename
   * @param type
   * @param context
   * @returns {GPCodes}
   */
  gp_camera_file_get(
    camera: PointerCamera,
    path: string,
    filename: string,
    type: GPCaptureTypes,
    cameraFile: PointerCameraFile,
    context: PointerContext
  ): GPCodes;
}
