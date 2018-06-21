import {ICloseable} from "../interfaces/ICloseable";
import {Pointer} from "../interfaces/Pointer";
import {Camera} from "./Camera";

export class CameraWidgets implements ICloseable {
  readonly pointer: Pointer;

  constructor(camera: Camera) {}

  close(): this {
    return this;
  }
}
