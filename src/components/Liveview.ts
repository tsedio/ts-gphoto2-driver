import * as EventEmitter from "events";
import {PointerCamera} from "../driver/modules";
import {ICloseable, ILiveviewOptions} from "../interfaces";
import {CameraFile} from "./CameraFile";
import {Context} from "./Context";
import {addInstance} from "./Garbarge";
import {PointerWrapper} from "./PointerWrapper";

export class Liveview extends EventEmitter implements ICloseable {
  /**
   *
   */
  private timer: any;
  /**
   *
   */
  private file: CameraFile;
  /**
   *
   */
  private options: ILiveviewOptions;

  constructor(private camera: PointerWrapper<PointerCamera>, options: Partial<ILiveviewOptions>) {
    super();
    this.options = {fps: 24, output: "binary", ...options};
    addInstance(this);
  }

  /**
   *
   */
  public start() {
    this.file = new CameraFile();

    this.timer = setInterval(() => this.onTick(), 1000 / this.options.fps);
  }

  /**
   *
   */
  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.options.output === "file") {
      if (!this.options.filePath) {
        throw new Error("You should specify filePath option, if you choose output: file");
      }
      // TODO if output === "file", it will save only the lase frame, because CamerFile overwrites each time
      // we fire capture_preview.
      // Maybe it is a good idea, to just use CameraFileFromFd to save it directly from C library
      this.file.save(this.options.filePath);
    }
    this.file.closeQuietly();
    // TODO after stop() I always see an error in the console like
    // malloc: *** error for object 0x102609d00: pointer being freed was not allocated
    // *** set a breakpoint in malloc_error_break to debug
  }

  public close() {
    this.stop();

    return this;
  }

  private async onTick() {
    await this.camera.callAsync("capture_preview", this.file.pointer, Context.get().pointer);
    if (this.options.output === "binary" || this.options.output === "base64") {
      const {data, size} = await this.file.getDataAndSize(this.options.output);
      this.emit("data", data, size);
    }
  }
}
