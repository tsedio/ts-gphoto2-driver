import {Closeable, StructCameraFilePath} from "@tsed/gphoto2-core";
import type {Pointer} from "ref-napi";

export class CameraFilePath implements Closeable {
  readonly buffer: Pointer<StructCameraFilePath>;

  constructor() {
    const struct = new StructCameraFilePath();
    this.buffer = struct.ref();
  }

  get pointer(): StructCameraFilePath {
    return this.buffer.deref();
  }

  get filename(): string {
    return this.pointer.name.buffer.readCString(0);
  }

  get path(): string {
    return this.pointer.folder.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public toString() {
    return "CameraFilePath{" + this.path + " " + this.filename + "}";
  }

  /**
   *
   * @returns {this}
   */
  public close(): this {
    return this;
  }
}
