import {checkCode, getGPhoto2Driver, GPPointerString, PointerList, RefList} from "@tsed/gphoto2-core";
import {PointerWrapper} from "./PointerWrapper";

export class List<T> extends PointerWrapper<PointerList> {
  constructor() {
    super({method: "gp_list", refType: RefList});
  }

  /**
   *
   * @returns {any}
   */
  get size(): number {
    return checkCode(getGPhoto2Driver().gp_list_count(this.pointer));
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getName(index: number): string {
    const ref = GPPointerString();

    getGPhoto2Driver().gp_list_get_name(this.pointer, index, ref);

    return ref.deref();
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getValue(index: number): string {
    const ref = GPPointerString();

    getGPhoto2Driver().gp_list_get_value(this.pointer, index, ref);

    return ref.deref();
  }

  public push(name: string, value: string) {
    checkCode(getGPhoto2Driver().gp_list_append(this.pointer, name, value));
  }

  public get(index: number): T | undefined {
    if (index < this.size) {
      return {
        id: index,
        model: this.getName(index),
        port: this.getValue(index)
      } as any;
    }

    return undefined;
  }

  /**
   *
   * @returns {ICamera}
   */
  public toArray(): T[] {
    const list = [];
    const size = this.size;

    for (let i = 0; i < size; i++) {
      list.push(this.get(i));
    }

    return list as any[];
  }
}
