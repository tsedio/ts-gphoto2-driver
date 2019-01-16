import * as EventEmitter from "events";
import * as fs from "fs";
import {Camera} from "./Camera";
import {ICloseable, ILiveviewOptions} from "../interfaces";
import {CameraFile} from "./CameraFile";
import {CameraFileFromFd} from "./CameraFileFromFd";
import {Context} from "./Context";
import {addInstance} from "./Garbage";

export class Liveview extends EventEmitter implements ICloseable {
  /**
   *
   */
  private timer?: NodeJS.Timer;
  /**
   *
   */
  private file?: CameraFile;
  /**
   *
   */
  private options: ILiveviewOptions;
  /**
   *
   */
  private fd?: number; // File descriptor of the the file to write to

  constructor(private camera: Camera, options: Partial<ILiveviewOptions>) {
    super();
    this.options = {fps: 24, output: "binary", ...options};
    addInstance(this);
  }

  /**
   *
   */
  public start() {
    switch (this.options.output) {
      case "file":
        if (!this.options.filePath) {
          throw new Error("You should specify filePath option, if you choose output: file");
        }
        this.fd = fs.openSync(this.options.filePath, "w", 0o777);
        this.file = new CameraFileFromFd(this.fd);
        break;
      default:
        this.file = new CameraFile();
    }
    this.timer = setInterval(() => this.onTick(), 1000 / this.options.fps);
  }

  public stop() {
    this.timer && clearInterval(this.timer);
    this.fd && fs.closeSync(this.fd);
    this.file && this.file.closeQuietly();
    this.file = undefined;
    this.timer = undefined;
    this.fd = undefined;
  }

  public close() {
    this.stop();

    return this;
  }

  private async onTick() {
    if (!this.file) {
      throw new Error("LiveView was closed");
    }
    await this.camera.callAsync("capture_preview", this.file.pointer, Context.get().pointer);

    if (this.options.output === "binary" || this.options.output === "base64") {
      const {data, size} = await this.file.getDataAndSizeAsync(this.options.output);
      this.emit("data", data, size);
    }
  }
}
