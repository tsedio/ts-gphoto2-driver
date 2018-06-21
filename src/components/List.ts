import {checkCode, GPhoto2Driver} from "../driver/GPhoto2Driver";
import {newPointerList, getListName, getListValue} from "../driver/GPPointerOf";
import {ICamera} from "../interfaces/ICamera";
import {ICloseable} from "../interfaces/ICloseable";

export class List<T> implements ICloseable {
  readonly pointer = newPointerList();

  constructor() {}

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
    return getListName(this.pointer, index);
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getValue(index: number): string {
    return getListValue(this.pointer, index);
  }

  public push(name: string, value: string) {
    checkCode(GPhoto2Driver.gp_list_append(this.pointer, name, value));
  }

  public close(): this {
    checkCode(GPhoto2Driver.gp_list_free(this.pointer));
    return this;
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
