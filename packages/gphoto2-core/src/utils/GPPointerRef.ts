import {alloc, refType} from "ref-napi";
import {PointerRef} from "../types";

/**
 *
 * @param type
 * @returns {PointerRef<T>}
 * @constructor
 */
export function GPPointerRef<T = any>(type: any = "void"): PointerRef<T> {
  return alloc(refType(type)) as any;
}
