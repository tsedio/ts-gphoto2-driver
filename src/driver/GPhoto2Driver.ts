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
export function newPointerPortInfoList(): PointerPortInfoList {
  return GPPointerOf("gp_port_info_list_new");
}

/**
 * Returns library versions as a displayable string.
 * @return verbose version, never null, for example: "2.4.10.1 gcc (C compiler used) ltdl (for portable loading of camlibs) EXIF (for special handling of EXIF files) "
 */
export function getLibraryVersion() {
  return GPhoto2Driver.gp_library_version(GPVersionTypes.GP_VERSION_VERBOSE).join(" ");
}
