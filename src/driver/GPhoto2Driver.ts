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
export const GPhoto2Driver: GPhoto2Driver = ffi.Library("libgphoto2", {
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

[].concat(GP_CAMERA_MODULE_ASYNC_KEYS as any, GP_FILE_MODULE_ASYNC_KEYS as any).forEach(key => {
  // console.debug("[GPDRIVER] Bind async method", key);
  (GPhoto2Driver as any)[key + "_async"] = function async(...args: any[]) {
    // console.debug("[GPDRIVER] Call async method", key, args.length);

    return new Promise(resolve => {
      (GPhoto2Driver as any)[key].async(...args, resolve);
    });
  };
});
