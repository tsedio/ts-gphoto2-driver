import {readCString} from "ref";
import {ICloseable} from "../../interfaces";
import {GPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes} from "../types/GPCodes";
import {Pointer} from "../types/Pointer";

export function checkCode(returnValue: any) {
  if (returnValue < GPCodes.GP_OK) {
    const errorStr = GPhoto2Driver.gp_port_result_as_string(returnValue);
    throw new Error(" returned " + returnValue + ": " + errorStr);
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
    console.warn("Failed to close Closeable " + (c as any).prototype.name, er);
  }
}

export function PointerToString(p: Pointer) {
  return readCString(p, 0);
}
