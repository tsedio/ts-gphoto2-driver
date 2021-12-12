import {Pointer, refType, types, ArrayType, StructType} from "../napi";
import {GPCameraDriverStatus, GPCameraFileOperation, GPCameraFolderOperation, GPCameraOperation, GPDeviceType, GPPortType} from "../types";
import {GPCodes} from "../types/GPCodes";
import {StructBuffer} from "../types/StructBuffer";
import {PointerContext, RefContext} from "./GPContextModule";
import {PointerList, RefList} from "./GPListModule";
import {PointerPortInfoList, RefPortInfoList} from "./GPPortInfoModule";

/**
 *
 */
export type PointerAbilitiesList = Pointer<void>;
/**
 *
 */
// tslint:disable-next-line
export const RefAbilitiesList = refType("void");

/**
 *
 */
export type StructCameraAbilities = StructType & {
  model: Pointer<string> & StructBuffer;
  speed: Pointer<number[]>;
  port: GPPortType;
  status: GPCameraDriverStatus;
  id: Pointer<string> & StructBuffer;
  library: Pointer<string> & StructBuffer;
  operation: GPCameraOperation;
  file_operations: GPCameraFileOperation;
  folder_operations: GPCameraFolderOperation;
  usb_vendor: number;
  usb_product: number;
  usb_class: number;
  usb_subclass: number;
  usb_protocol: number;
  device_type: GPDeviceType /**< \brief Device type. */;
  reserved2: number /**< reserved space \internal */;
  reserved3: number /**< reserved space \internal */;
  reserved4: number /**< reserved space \internal */;
  reserved5: number /**< reserved space \internal */;
  reserved6: number /**< reserved space \internal */;
  reserved7: number /**< reserved space \internal */;
  reserved8: number /**< reserved space \internal */;
  ref(): Pointer<StructCameraAbilities>;
};
/**
 *
 * @type {StructType}
 */
// tslint:disable-next-line
export const StructCameraAbilities = StructType({
  model: ArrayType(types.uchar, 128),
  speed: ArrayType(types.uint, 128),
  port: types.uint,
  status: types.uint,
  id: ArrayType(types.uchar, 1024),
  library: ArrayType(types.uchar, 1024),
  operations: types.uint /**< \brief Camera operation funcs */,
  file_operations: types.uint /**< \brief Camera file op funcs */,
  folder_operations: types.uint /**< \brief Camera folder op funcs */,
  usb_vendor: types.uint,
  usb_product: types.uint,
  usb_class: types.uint,
  usb_subclass: types.uint,
  usb_protocol: types.uint,
  device_type: types.uint /**< \brief Device type. */,
  reserved2: types.uint /**< reserved space \internal */,
  reserved3: types.uint /**< reserved space \internal */,
  reserved4: types.uint /**< reserved space \internal */,
  reserved5: types.uint /**< reserved space \internal */,
  reserved6: types.uint /**< reserved space \internal */,
  reserved7: types.uint /**< reserved space \internal */,
  reserved8: types.uint /**< reserved space \internal */
});

/**
 *
 * @type {any}
 */
// tslint:disable-next-line
export const GPAbilitiesListModuleDescription = {
  gp_abilities_list_new: ["void", [refType(RefAbilitiesList)]],
  gp_abilities_list_load: ["int", [RefAbilitiesList, RefContext]],
  gp_abilities_list_detect: ["int", [RefAbilitiesList, RefPortInfoList, RefList, RefContext]],
  gp_abilities_list_free: ["int", [RefAbilitiesList]],
  gp_abilities_list_count: ["int", [RefAbilitiesList]],
  gp_abilities_list_load_dir: ["int", [RefAbilitiesList, refType("string"), RefContext]]
};

/**
 *
 */
export interface IGPAbilitiesListModule {
  /**
   * Allocate the memory for a new abilities list.
   *
   * Function to allocate the memory for a new abilities list.
   *
   * You would then call `gp_abilities_list_load()` in order to
   * populate it.
   *
   * @param abilitiesList CameraAbilitiesList object to initialize
   * @returns gphoto2 error code
   *

   */
  gp_abilities_list_new(abilitiesList: Pointer<PointerAbilitiesList>): void;

  /**
   * Scans the system for camera drivers.
   *
   * All supported camera models will then be added to the list.
   *
   * @params list a CameraAbilitiesList
   * @params context a GPContext
   * @returns a gphoto2 error code
   */
  gp_abilities_list_load(abilitiesList: PointerAbilitiesList, context: PointerContext): GPCodes;

  /**
   *
   * @param {PointerAbilitiesList} abilitiesList
   * @param {string} dir
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_abilities_list_load_dir(abilitiesList: PointerAbilitiesList, dir: string, context: PointerContext): GPCodes;

  /**
   * Tries to detect any camera connected to the computer using the supplied
   * list of supported cameras and the supplied info_list of ports.
   *
   * @returns a gphoto2 error code
   * @param abilitiesList a CameraAbilitiesList
   * @param infoList the GPPortInfoList of ports to use for detection
   * @param cameraList a #CameraList that contains the autodetected cameras after the call
   * @param context a #GPContext
   */
  gp_abilities_list_detect(
    abilitiesList: PointerAbilitiesList,
    infoList: PointerPortInfoList,
    cameraList: PointerList,
    context: PointerContext
  ): GPCodes;

  /**
   * Free the given CameraAbilitiesList object.
   *
   * @param abilitiesList a CameraAbilitiesList
   * @return a gphoto2 error code
   */
  gp_abilities_list_free(abilitiesList: PointerAbilitiesList): GPCodes;

  /**
   * Count the entries in the supplied list.
   * @param abilitiesList a #CameraAbilitiesList
   * @returns The number of entries or a gphoto2 error code
   */
  gp_abilities_list_count(abilitiesList: PointerAbilitiesList): GPCodes;
}
