import {alloc, allocCString} from "ref-napi";
import {PointerOf} from "../types";

/**
 * Create a new Pointer.
 * @param type
 * @returns {PointerOf<T>}
 */
export function GPPointer<T = any>(type: any = "void"): PointerOf<T> {
  return alloc(type) as any;
}

/**
 * Create a new pointer of string.
 * @param {string} value
 * @returns {PointerOf<string>}
 */
export function GPPointerString(value?: string): PointerOf<string> {
  return value !== undefined ? (allocCString(value) as any) : (alloc("string") as any);
}

/**
 * Create a new pointer of int
 * @param {number} value
 * @returns {PointerOf<number>}
 */
export function GPPointerInt(value?: number): PointerOf<number> {
  return alloc("int", value) as any;
}

/**
 * Create a new pointer of Float.
 * @param {number} value
 * @returns {PointerOf<number>}
 */
export function GPPointerFloat(value?: number): PointerOf<number> {
  return alloc("float", value) as any;
}
