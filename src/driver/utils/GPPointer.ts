import {alloc, allocCString, types} from "ref";
import {PointerOf} from "../types";

/**
 * Create a new Pointer.
 * @param type
 * @returns {PointerOf<T>}
 * @constructor
 */
export function GPPointer<T>(type: any = "void"): PointerOf<T> {
  return alloc(type) as any;
}

/**
 * Create a new pointer of string.
 * @param {string} value
 * @returns {PointerOf<string>}
 * @constructor
 */
export function GPPointerString(value?: string): PointerOf<string> {
  if (value !== undefined) {
    return allocCString(value) as any;
  }
  return alloc(types.CString) as any;
}

/**
 * Create a new pointer of int
 * @param {number} value
 * @returns {PointerOf<number>}
 * @constructor
 */
export function GPPointerInt(value?: number): PointerOf<number> {
  return alloc("int", value) as any;
}

/**
 * Create a new pointer of Float.
 * @param {number} value
 * @returns {PointerOf<number>}
 * @constructor
 */
export function GPPointerFloat(value?: number): PointerOf<number> {
  return alloc("float", value) as any;
}
