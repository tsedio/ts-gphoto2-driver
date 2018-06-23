import {types} from "ref";
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
  IGPWidgetModule
} from "./modules";
import {GPVersionTypes} from "./types";

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
 * Returns library versions as a displayable string.
 * @return verbose version, never null, for example: "2.4.10.1 gcc (C compiler used) ltdl (for portable loading of camlibs) EXIF (for special handling of EXIF files) "
 */
export function getLibraryVersion() {
  return GPhoto2Driver.gp_library_version(GPVersionTypes.GP_VERSION_VERBOSE).join(" ");
}
