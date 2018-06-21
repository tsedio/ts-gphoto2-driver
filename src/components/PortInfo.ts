import {ICloseable} from "../interfaces/ICloseable";
import {PointerPortInfo} from "../interfaces/Pointer";

export class PortInfo implements ICloseable {
  readonly pointer: PointerPortInfo;

  // readonly buffer = GPPointerRef();

  close(): this {
    return this;
  }
}
