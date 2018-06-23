import {alloc, allocCString, refType} from "ref";
import {GPhoto2Driver} from "../GPhoto2Driver";
import {PointerOf, PointerRef} from "../types";
import {GPPointerRef} from "./GPPointerRef";
import {checkCode} from "./GPUtils";

/**
 * Create a new typed pointer from the GP contructor method.
 * @param {string} key The GP method constructor.
 * @param type The type of the pointer
 * @returns {any} A pointer
 */
export function GPPointerOf<T>(key: string, type: any = "void"): PointerOf<T> {
  const buffer: PointerRef<T> = GPPointerRef<T>(type);

  checkCode((GPhoto2Driver as any)[key](buffer));

  return buffer.deref();
}


export function GPPointer<T>(type: any = "void"): PointerOf<T> {
  return refType(type) as any;
}

/**
 *
 * @param {string} value
 * @returns {PointerOf<string>}
 * @constructor
 */
export function GPPointerString(value: string): PointerOf<string> {
  return allocCString(value) as any;
}

/**
 *
 * @param {number} value
 * @returns {PointerOf<number>}
 * @constructor
 */
export function GPPointerInt(value?: number): PointerOf<number> {
  return alloc("int", value) as any;
}

/**
 *
 * @param {number} value
 * @returns {PointerOf<number>}
 * @constructor
 */
export function GPPointerFloat(value?: number): PointerOf<number> {
  return alloc("float", value) as any;
}
