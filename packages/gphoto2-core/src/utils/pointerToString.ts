import {readCString} from "ref-napi";

/**
 * Return the string value of the pointer.
 * @param {Pointer<string>} p
 * @returns {string}
 * @constructor
 */
export function pointerToString(p: Buffer) {
  return readCString(p, 0);
}
