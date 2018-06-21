import {readCString, types} from "ref";
import {
  GPAbilitiesListModuleDescription,
  GPCameraModuleDescription,
  GPContextModuleDescription,
  GPFileModuleDescription,
  GPListModuleDescription,
  GPPortInfoModuleDescription,
  GPWidgetModuleDescription,
  IGPAbilitiesListModule,
  IGPCameraModule,
  IGPContextModule,
  IGPFileModule,
  IGPListModule,
  IGPPortInfoModule,
  IGPWidgetModule,
  PointerAbilityList,
  PointerCamera,
  PointerCameraFile,
  PointerList,
  PointerPortInfoList
} from "./modules";
import {GPVersionTypes} from "./types";
import {GPPointerOf} from "./utils/GPPointerOf";
import {GPPointerRef} from "./utils/GPPointerRef";

const ffi = require("ffi-napi");
/**
 *
 */
export type GPhoto2Driver = IGPContextModule &
  IGPListModule &
  IGPCameraModule &
  IGPWidgetModule &
  IGPFileModule &
  IGPAbilitiesListModule &
  IGPPortInfoModule;
/**
 *
 */
export const GPhoto2Driver = ffi.Library("libgphoto2", {
  // CONTEXT
  ...GPContextModuleDescription,

  // PORT INFO
  ...GPPortInfoModuleDescription,

  // LIST
  ...GPListModuleDescription,

  // ABILITIES
  ...GPAbilitiesListModuleDescription,

  // Camera
  ...GPCameraModuleDescription,

  // File
  ...GPFileModuleDescription,

  // Widget
  ...GPWidgetModuleDescription,

  gp_library_version: [types.CString, ["int"]]
});

/**
 *
 * @returns {any}
 */
export function newPointerCamera(): PointerCamera {
  return GPPointerOf<PointerCamera>("gp_camera_new");
}

/**
 *
 * @returns {any}
 */
export function newPointerCameraFile(): PointerCameraFile {
  return GPPointerOf("gp_file_new");
}

/**
 *
 * @returns {any}
 */
export function newPointerList(): PointerList {
  return GPPointerOf("gp_list_new");
}

/**
 *
 * @returns {any}
 */
export function newPointerAbilitiesList(): PointerAbilityList {
  return GPPointerOf("gp_abilities_list_new");
}

/**
 *
 * @returns {any}
 */
export function newPointerPortInfoList(): PointerPortInfoList {
  return GPPointerOf("gp_port_info_list_new");
}

/**
 *
 * @param list
 * @param {number} index
 * @returns {any}
 */
export function getListName(list: PointerList, index: number): string {
  const buffer = GPPointerRef(types.CString);

  GPhoto2Driver.gp_list_get_name(list, index, buffer);

  return readCString(buffer.deref(), 0);
}

/**
 *
 * @param list
 * @param {number} index
 * @returns {any}
 */
export function getListValue(list: PointerList, index: number): string {
  const buffer = GPPointerRef(types.CString);

  GPhoto2Driver.gp_list_get_value(list, index, buffer);

  return readCString(buffer.deref(), 0);
}

/**
 * Returns library versions as a displayable string.
 * @return verbose version, never null, for example: "2.4.10.1 gcc (C compiler used) ltdl (for portable loading of camlibs) EXIF (for special handling of EXIF files) "
 */
export function getLibraryVersion() {
  return GPhoto2Driver.gp_library_version(GPVersionTypes.GP_VERSION_VERBOSE).join(" ");
}
