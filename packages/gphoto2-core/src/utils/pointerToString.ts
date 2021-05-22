import {PointerOf} from "../types/Pointer";
import {readCString} from "ref-napi";

/**
 * Return the string value of the pointer.
 * @param {PointerOf<string>} p
 * @returns {string}
 * @constructor
 */
export function pointerToString(p: PointerOf<string>) {
  return readCString(p, 0);
}
