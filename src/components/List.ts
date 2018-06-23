import {types} from "ref";
import {checkCode, GPhoto2Driver, GPPointer} from "../driver";
import {PointerList, RefList} from "../driver/modules";
import {ICamera} from "../interfaces";
import {PointerWrapper} from "./PointerWrapper";

export class List<T> extends PointerWrapper<PointerList> {

  constructor() {
    super("gp_list", RefList);
  }

  /**
   *
   * @returns {any}
   */
  get size(): number {
    return checkCode(GPhoto2Driver.gp_list_count(this.pointer));
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getName(index: number): string {
    const ref = GPPointer<string>(types.CString);

    GPhoto2Driver.gp_list_get_name(this.pointer, index, ref);

    return ref.deref();
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getValue(index: number): string {
    const ref = GPPointer<string>(types.CString);

    GPhoto2Driver.gp_list_get_value(this.pointer, index, ref);

    return ref.deref();
  }

  public push(name: string, value: string) {
    checkCode(GPhoto2Driver.gp_list_append(this.pointer, name, value));
  }

  /**
   *
   * @returns {ICamera}
   */
  public toArray(): T[] {
    const list = [];
    const size = this.size;
    for (let i = 0; i < size; i++) {
      const name = this.getName(i);
      const value = this.getValue(i);
      list.push({
        name,
        value
      });
    }

    return list as any[];
  }
}
