import {alloc, refType} from "ref-napi";
import {getGPhoto2Driver} from "../GPhoto2Driver";
import {PointerRef} from "../types";
import {checkCode} from "./GPUtils";

/**
 *
 * @param type
 * @returns {PointerRef<T>}
 * @constructor
 */
export function GPPointerRef<T = any>(type: any = "void"): PointerRef<T> {
  return alloc(refType(type)) as any;
}

/**
 * Create a new typed pointer from the GP constructor method.
 * @param {string} key The GP method constructor.
 * @param type The type of the pointer
 * @returns {any} A pointer
 */
export function GPPointerRefOf<T = any>(key: string, type: any = "void"): PointerRef<T> {
  const buffer: PointerRef<T> = GPPointerRef<T>(type);

  checkCode(getGPhoto2Driver()[key](buffer));

  return buffer;
}
