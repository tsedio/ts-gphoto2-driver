import {alloc, allocCString, refType} from "ref";
import {PointerRef} from "../types";

/**
 *
 * @param type
 * @returns {PointerRef<T>}
 * @constructor
 */
export function GPPointerRef<T>(type: any = "void"): PointerRef<T> {
  return alloc(refType(type)) as any;
}
