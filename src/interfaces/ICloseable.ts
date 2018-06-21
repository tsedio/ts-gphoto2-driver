import {Pointer} from "./Pointer";

export interface ICloseable {
  readonly pointer: Pointer;
  close(): this;
}
