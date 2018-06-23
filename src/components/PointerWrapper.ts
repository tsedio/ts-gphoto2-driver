import {checkCode, GPhoto2Driver, GPPointerOf} from "../driver";
import {PointerOf} from "../driver/types";
import {ICloseable} from "../interfaces";

export class PointerWrapper<P extends PointerOf<any>> implements ICloseable {
  readonly pointer: P;

  constructor(private gpMethodType: string, ...args: any[]) {
    this.pointer = GPPointerOf<any>(`${gpMethodType}_new`) as P;
  }

  close(): this {

    checkCode(GPhoto2Driver[`${this.gpMethodType}_free`](this.pointer));

    return this;
  }
}