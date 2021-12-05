import {$log} from "@tsed/logger";
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
import {getLibLocation} from "./utils/getLibLocation";
import {checkCode, CheckCodeException} from "./utils/checkCode";

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
export let GPhoto2Driver: GPhoto2Driver & Record<string, any> & RunnableDriverMethods;

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

export interface RunnableDriverMethods {
  run<T = any>(method: keyof GPhoto2Driver, ...args: any[]): T;

  runAsync<T = any>(method: keyof GPhoto2Driver, ...args: any[]): Promise<T>;
}

// istanbul ignore next
export function getGPhoto2Driver(): GPhoto2Driver & Record<string, any> & RunnableDriverMethods {
  if (!GPhoto2Driver) {
    const libPath = getLibLocation();

    $log.debug("Load library from", libPath);
    const driver = ffi.Library(libPath, driverFunctions);

    [...GP_CAMERA_MODULE_ASYNC_KEYS, ...GP_FILE_MODULE_ASYNC_KEYS].forEach((key) => {
      driver[`${key}_async`] = util.promisify(driver[key].async);
    });

    GPhoto2Driver = driver;

    driver.run = runMethod;
    driver.runAsync = runAsyncMethod;
  }

  return GPhoto2Driver;
}

// istanbul ignore next
export function runMethod<T = any>(method: keyof GPhoto2Driver, ...args: any[]): T {
  const driver = getGPhoto2Driver();

  if (!driver[method]) {
    throw new Error(`GPhoto2Driver.${method} doesn't exists`);
  }

  try {
    const result = (driver[method] as any)(...args);
    return checkCode(result, method);
  } catch (er) {
    if (er instanceof CheckCodeException) {
      throw er;
    }

    $log.error(`Error when calling method GPhoto2Driver.${method}. ${er.message}`, er.stack);
    process.exit(-1);
  }
}

// istanbul ignore next
export async function runAsyncMethod<T = any>(method: keyof GPhoto2Driver, ...args: any[]): Promise<T> {
  const driver = getGPhoto2Driver();

  if (!driver[method]) {
    throw new Error(`GPhoto2Driver.${method} doesn't exists`);
  }
  try {
    const result = await (driver[method] as any)(...args);

    return checkCode(result, method);
  } catch (er) {
    if (er instanceof CheckCodeException) {
      throw er;
    }

    $log.error(`Error when calling method GPhoto2Driver.${method}. ${er.message}`, er.stack);
    process.exit(-1);
  }
}
