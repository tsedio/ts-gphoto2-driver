import ffi from "ffi-napi";
import util from "util";
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
export let GPhoto2Driver: GPhoto2Driver & Record<string, any>;
export const driverFunctions = {
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
};

// istanbul ignore next
export function getGPhoto2Driver(): GPhoto2Driver & Record<string, any> {
  if (!GPhoto2Driver) {
    const driver = ffi.Library("libgphoto2", driverFunctions);

    [...GP_CAMERA_MODULE_ASYNC_KEYS, ...GP_FILE_MODULE_ASYNC_KEYS].forEach((key) => {
      driver[`${key}_async`] = util.promisify(driver[key].async);
    });

    GPhoto2Driver = driver;
  }

  return GPhoto2Driver;
}
