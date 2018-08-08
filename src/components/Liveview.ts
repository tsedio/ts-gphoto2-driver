import * as EventEmitter from "events";
import {alloc} from "ref";
import {checkCode, GPhoto2Driver, GPPointerString, PointerToString} from "../driver";
import {PointerCamera, PointerCameraFile, RefCameraFile} from "../driver/modules";
import {PointerOf} from "../driver/types";
import {Context} from "./Context";

export class Liveview extends EventEmitter {
  private timer: any;
  private buffer: PointerOf<PointerCameraFile>;

  constructor(private camera: PointerCamera) {
    super();

    this.buffer = alloc(RefCameraFile) as any;

    checkCode(GPhoto2Driver.gp_file_new_from_fd(this.buffer, (process.stdout as any).fd), "gp_file_new_from_fd");
  }

  /**
   *
   */
  start() {
    this.timer = setInterval(() => this.onTick(), 100);
  }

  /**
   *
   */
  stop() {
    if (this.timer) {
      clearInterval(this.timer);

      checkCode(GPhoto2Driver.gp_file_unref(this.buffer.deref()));
    }
  }

  private async onTick() {
    const mime = GPPointerString();
    const result = GPhoto2Driver.gp_camera_capture_preview(this.camera, this.buffer.deref(), Context.get().pointer);

    checkCode(result);

    GPhoto2Driver.gp_file_get_mime_type(this.buffer.deref(), mime);

    this.emit("data", PointerToString(this.buffer.deref() as any));
  }
}
