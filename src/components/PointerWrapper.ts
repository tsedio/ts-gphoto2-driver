import {alloc, Type} from "ref";
import {checkCode, closeQuietly, GPhoto2Driver} from "../driver";
import {PointerOf} from "../driver/types";
import {ICloseable} from "../interfaces";
import {addInstance, removeInstance} from "./Garbarge";

export class PointerWrapper<P extends PointerOf<any>> implements ICloseable {
  readonly buffer: PointerOf<P>;

  constructor(private gpMethodType: string, refType: Type) {
    this.buffer = alloc(refType) as any;

    checkCode((GPhoto2Driver as any)[`${gpMethodType}_new`](this.buffer), `${gpMethodType}_new`);

    addInstance(this);
  }

  get pointer(): P {
    return this.buffer.deref();
  }

  close(): this {
    this.call("free");
    removeInstance(this);

    return this;
  }

  closeQuietly() {
    closeQuietly(this);
  }

  call(key: string, ...args: any[]) {
    const method = `${this.gpMethodType}_${key}`;

    if ((GPhoto2Driver as any)[method]) {
      return checkCode((GPhoto2Driver as any)[method](this.pointer, ...args), method);
    }

    throw new Error(method + " on GPhoto2Driver doesn't exists");
  }
}
