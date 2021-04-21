import {readCString} from "ref-napi";
import {getGPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes, PointerOf} from "../types";

/**
 *
 * @param returnValue
 * @param method
 * @returns {any}
 */
export function checkCode(returnValue: any, method = ""): any {
  if (returnValue < GPCodes.GP_OK) {
    const errorStr = getGPhoto2Driver().gp_port_result_as_string(returnValue);
    throw new Error(`${method} returned ${returnValue}: ${GPCodes[returnValue] || "Unsupported code"} > ${errorStr}`);
  }

  return returnValue;
}

/**
 *
 * @param returnValue
 */
export function checkQuietly(returnValue: any): void {
  try {
    checkCode(returnValue);
  } catch (err) {
    console.warn("Failed to invoke method", err.stack);
  }
}

export interface Closeable {
  close(): this;
}

/**
 *
 * @param {Closeable} c
 */
export function closeQuietly(c: Closeable) {
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
