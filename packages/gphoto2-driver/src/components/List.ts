import {GPPointerString, PointerList, RefList} from "@tsed/gphoto2-core";
import {PointerWrapper} from "./PointerWrapper";

export class List<T> extends PointerWrapper<PointerList> {
  constructor() {
    super({method: "gp_list", refType: RefList});
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getName(index: number): string {
    const ref = GPPointerString();

    this.call("get_name", index, ref);

    return ref.deref();
  }

  /**
   *
   * @param {number} index
   * @returns {any}
   */
  public getValue(index: number): string {
    const ref = GPPointerString();

    this.call("get_value", index, ref);

    return ref.deref();
  }

  public push(name: string, value: string) {
    this.call("append", name, value);
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
