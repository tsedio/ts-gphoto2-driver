import {$log} from "@tsed/logger";
import {getGPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes} from "../types/GPCodes";

/**
 *
 * @param returnValue
 * @param method
 * @param silent
 * @returns {any}
 */
export function checkCode(returnValue: any, method = "", silent = false): any {
  if (returnValue < GPCodes.GP_OK) {
    const errorStr = getGPhoto2Driver().gp_port_result_as_string(returnValue);
    const error = new Error(`${method} returned ${returnValue}: ${GPCodes[returnValue] || "Unsupported code"} > ${errorStr}`);

    if (!silent) {
      $log.error(error.message);
      throw error;
    } else {
      $log.warn(error.message);
    }
  }

  return returnValue;
}

/**
 *
 * @param returnValue
 * @param method
 */
export function checkQuietly(returnValue: any, method = ""): void {
  return checkCode(returnValue, method, true);
}
