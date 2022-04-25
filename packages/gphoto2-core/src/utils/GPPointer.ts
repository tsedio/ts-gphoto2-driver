import {alloc, allocCString, Pointer, refType} from "ref-napi";

/**
 * Create a new Pointer.
 * @param type
 * @returns {Pointer<T>}
 */
export function GPPointer<T = any>(type: any = "void"): Pointer<T> {
  return alloc(type) as any;
}

/**
 * Create a new pointer of string.
 * @param {string} value
 * @returns {Pointer<string>}
 */
export function GPPointerString(value?: string): Pointer<string> {
  return value !== undefined ? (allocCString(value) as any) : (alloc("string") as any);
}

/**
 * Create a new pointer of int
 * @param {number} value
 * @returns {Pointer<number>}
 */
export function GPPointerInt(value?: number): Pointer<number> {
  return alloc("int", value) as any;
}

/**
 * Create a new pointer of Float.
 * @param {number} value
 * @returns {Pointer<number>}
 */
export function GPPointerFloat(value?: number): Pointer<number> {
  return alloc("float", value) as any;
}

/**
 * @param type
 * @returns {Pointer<Pointer<T>}
 * @constructor
 */
export function GPPointerRef<T = any>(type: any = "void"): Pointer<T> {
  return alloc(refType(type)) as any;
}
