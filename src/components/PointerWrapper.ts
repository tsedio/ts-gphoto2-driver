import {alloc, Type} from "ref";
import {checkCode, closeQuietly, GPCodes, GPhoto2Driver} from "../driver";
import {PointerOf} from "../driver/types";
import {ICloseable} from "../interfaces";
import {addInstance, removeInstance} from "./Garbage";

export interface IPointerWrapperOptions {
  method: string;
  refType: Type;
  openMethod?: string;
  closeMethod?: string;
}

export class PointerWrapper<P extends PointerOf<any>> implements ICloseable {
  private _buffer: PointerOf<P>;

  constructor(private options: IPointerWrapperOptions, ...args: any[]) {
    this.new(...args);
  }

  get buffer(): PointerOf<P> {
    return this._buffer;
  }

  get byRef(): PointerOf<P> {
    return this._buffer;
  }

  get pointer(): P {
    return this._buffer.deref();
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

  protected new(...args: any[]): GPCodes {
    const {openMethod, refType} = this.getOptions();

    addInstance(this);
    this._buffer = alloc(refType) as any;

    return this.callByRef(openMethod!, ...args);
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

    if ((GPhoto2Driver as any)[method]) {
      return checkCode((GPhoto2Driver as any)[method](this.byRef, ...args), method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }

  call(key: string, ...args: any[]) {
    let {method} = this.getOptions();
    method = `${method}_${key}`;

    if ((GPhoto2Driver as any)[method]) {
      return checkCode((GPhoto2Driver as any)[method](this.pointer, ...args), method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }

  async callAsync(key: string, ...args: any[]) {
    let {method} = this.getOptions();
    method = `${method}_${key}`;

    if ((GPhoto2Driver as any)[method]) {
      const result = await (GPhoto2Driver as any)[method](this.pointer, ...args);

      return checkCode(result, method);
    }

    if (process.env.NODE_ENV !== "production") {
      console.warn(`${method} on GPhoto2Driver doesn't exists`);
    }
  }
}
