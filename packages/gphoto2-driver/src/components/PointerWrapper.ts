import {checkCode, Closeable, closeQuietly, getGPhoto2Driver, GPCodes, PointerOf} from "@tsed/gphoto2-core";
import {alloc, Type} from "ref-napi";
import {addInstance, removeInstance} from "./Garbage";

export interface PointerWrapperOptions {
  method: string;
  refType: Type;
  openMethod?: string;
  closeMethod?: string;
}

export class PointerWrapper<P extends PointerOf<any>> implements Closeable {
  constructor(private options: PointerWrapperOptions, ...args: any[]) {
    this.new(...args);
  }

  private _buffer: PointerOf<P>;

  get buffer(): PointerOf<P> {
    return this._buffer;
  }

  get byRef(): PointerOf<P> {
    return this._buffer;
  }

  get pointer(): P {
    return this._buffer.deref();
  }

  close(): this {
    const {closeMethod} = this.getOptions();

    this.call(closeMethod);
    removeInstance(this);

    return this;
  }

  closeQuietly() {
    closeQuietly(this);
  }

  callByRef(key: string, ...args: any[]) {
    let {method} = this.getOptions();
    method = `${method}_${key}`;
    const driver = getGPhoto2Driver();

    if (driver[method]) {
      return checkCode(driver[method](this.byRef, ...args), method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }

  call(key: string, ...args: any[]) {
    let {method} = this.getOptions();
    method = `${method}_${key}`;
    const driver = getGPhoto2Driver();

    if (driver[method]) {
      return checkCode(driver[method](this.pointer, ...args), method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }

  async callAsync(key: string, ...args: any[]) {
    let {method} = this.getOptions();
    method = `${method}_${key}`;
    const driver = getGPhoto2Driver();

    if (driver[method]) {
      const result = await driver[method](this.pointer, ...args);

      return checkCode(result, method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }

  protected new(...args: any[]): GPCodes {
    const {openMethod, refType} = this.getOptions();

    addInstance(this);
    this._buffer = alloc(refType) as any;

    return this.callByRef(openMethod, ...args);
  }

  private getOptions() {
    const {method, refType, openMethod = "new", closeMethod = "free"} = this.options;

    return {
      method,
      refType,
      openMethod,
      closeMethod
    };
  }
}
