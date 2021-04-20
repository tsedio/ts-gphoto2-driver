import {
  GP_CAMERA_MODULE_ASYNC_KEYS,
  GP_FILE_MODULE_ASYNC_KEYS,
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

const ffi = require("ffi-napi");
const util = require("util");

/**
 *
 */
export interface GPhoto2Driver
  extends IGPContextModule,
    IGPListModule,
    IGPCameraModule,
    IGPWidgetModule,
    IGPFileModule,
    IGPAbilitiesListModule,
    IGPPortInfoModule {}

// tslint:disable-next-line
export const GPhoto2Driver: GPhoto2Driver & {[key: string]: any} = ffi.Library("libgphoto2", {
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
  ...GPWidgetModuleDescription
});

[...GP_CAMERA_MODULE_ASYNC_KEYS, ...GP_FILE_MODULE_ASYNC_KEYS].forEach((key) => {
  GPhoto2Driver[`${key}_async`] = util.promisify(GPhoto2Driver[key].async);
});
