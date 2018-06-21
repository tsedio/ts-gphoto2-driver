import {alloc, refType} from "ref";
import {Pointer, PointerRef} from "../types/Pointer";
/**
 *
 * @param type
 * @returns {PointerRef<T extends Pointer>}
 * @constructor
 */
export function GPPointerRef<T extends Pointer>(type: any = "void"): PointerRef<T> {
  return alloc(refType(type)) as any;
}
