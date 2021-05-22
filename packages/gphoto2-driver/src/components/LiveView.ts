import {Closeable} from "@tsed/gphoto2-core";
import {EventEmitter} from "events";
import fs from "fs";
import {ensureDirSync} from "fs-extra";
import {dirname} from "path";
import {LiveViewOptions} from "../interfaces/LiveViewOptions";
import {Camera} from "./Camera";
import {CameraFile} from "./CameraFile";
import {CameraFileFromFd} from "./CameraFileFromFd";
import {Context} from "./Context";
import {addInstance} from "./Garbage";

export class LiveView extends EventEmitter implements Closeable {
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
  private options: LiveViewOptions;
  /**
   *
   */
  private fd?: number; // File descriptor of the the file to write to

  constructor(private camera: Camera, options: Partial<LiveViewOptions>) {
    super();
    this.options = {fps: 24, output: "binary", ...options};

    if (this.options.filePath) {
      ensureDirSync(dirname(this.options.filePath));
    }

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
