import {readCString} from "ref-napi";
import {ICloseable} from "../../interfaces";
import {GPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes, PointerOf} from "../types";

/**
 *
 * @param returnValue
 * @param method
 * @returns {any}
 */
export function checkCode(returnValue: any, method: string = "") {
  if (returnValue < GPCodes.GP_OK) {
    const errorStr = GPhoto2Driver.gp_port_result_as_string(returnValue);
    throw new Error(`${method} returned ${returnValue}: ${GPCodes[returnValue] || "Unsupported code"} > ${errorStr}`);
  }

  return returnValue;
}

/**
 *
 * @param returnValue
 */
export function checkQuietly(returnValue: any) {
  try {
    checkCode(returnValue);
  } catch (err) {
    console.warn("Failed to invoke method", err.stack);
  }
}

/**
 *
 * @param {ICloseable} c
 */
export function closeQuietly(c: ICloseable) {
  try {
    c.close();
  } catch (er) {
    const klass: any = (c as any).prototype ? c : c.constructor;
    console.warn("Failed to close Closeable " + klass.name, er);
  }
}

/**
 * Return the string value of the pointer.
 * @param {PointerOf<string>} p
 * @returns {string}
 * @constructor
 */
export function PointerToString(p: PointerOf<string>) {
  return readCString(p, 0);
}
