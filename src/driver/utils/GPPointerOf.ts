import {GPhoto2Driver} from "../GPhoto2Driver";
import {Pointer, PointerRef} from "../types/Pointer";
import {GPPointerRef} from "./GPPointerRef";
import {checkCode} from "./GPUtils";

/**
 *
 * @param {string} key
 * @param ref
 * @returns {any}
 */
export function GPPointerOf<T extends Pointer>(key: string, ref?: Pointer): T {
  const buffer: PointerRef<T> = GPPointerRef<T>(ref);
  checkCode((GPhoto2Driver as any)[key](buffer));

  return buffer.deref();
}
