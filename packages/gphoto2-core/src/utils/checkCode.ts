import {$log} from "@tsed/logger";
import {getGPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes} from "../types/GPCodes";

export class CheckCodeException extends Error {}

/**
 *
 * @param returnValue
 * @param method
 * @param silent
 * @returns {any}
 */
export function checkCode(returnValue: any, method = "", silent = false): any {
  $log.debug(`GPhoto2Driver.${method}() => ${returnValue}`);

  if (returnValue < GPCodes.GP_OK) {
    const errorStr = getGPhoto2Driver().gp_port_result_as_string(returnValue);
    const error = new CheckCodeException(`${method} returned ${returnValue}: ${GPCodes[returnValue] || "Unsupported code"} > ${errorStr}`);

    if (!silent) {
      $log.error(error.message, error.stack);
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
