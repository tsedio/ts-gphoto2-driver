import {alloc, Type} from "ref";
import {checkCode, GPhoto2Driver} from "../driver";
import {PointerOf} from "../driver/types";
import {ICloseable} from "../interfaces";

export class PointerWrapper<P extends PointerOf<any>> implements ICloseable {

  readonly buffer: PointerOf<P>;

  constructor(private gpMethodType: string, refType: Type) {
    this.buffer = alloc(refType) as any;

    checkCode((GPhoto2Driver as any)[`${gpMethodType}_new`](this.buffer), `${gpMethodType}_new`);
  }

  get pointer(): P {
    return this.buffer.deref();
  }

  close(): this {
    this.call("free");

    return this;
  }

  call(key: string, ...args: any[]) {
    return checkCode(GPhoto2Driver[`${this.gpMethodType}_${key}`](this.pointer, ...args), `${this.gpMethodType}_${key}`);
  }
}