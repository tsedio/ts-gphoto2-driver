import * as EventEmitter from "events";
import * as fs from "fs";
import * as path from "path";
import {PointerCamera} from "../driver/modules";
import {ICloseable, ILiveviewOptions} from "../interfaces";
import {CameraFileFromFd} from "./CameraFileFromFd";
import {Context} from "./Context";
import {addInstance} from "./Garbarge";
import {PointerWrapper} from "./PointerWrapper";

const TMP_PATH = path.join(__dirname, "../../.tmp/liveview.jpg");

export class Liveview extends EventEmitter implements ICloseable {
  /**
   *
   */
  private timer: any;
  /**
   *
   */
  private file: CameraFileFromFd;
  /**
   *
   */
  private fd: number;

  constructor(private camera: PointerWrapper<PointerCamera>, private options: Partial<ILiveviewOptions> = {fps: 100}) {
    super();
    addInstance(this);
  }

  /**
   *
   */
  public start() {
    if (this.options.stdout) {
      this.fd = (process.stdout as any).fd;
    } else {
      this.fd = fs.openSync(TMP_PATH, "w+", 0o666);
    }

    this.file = new CameraFileFromFd(this.fd);

    this.timer = setInterval(() => this.onTick(), this.options.fps);
  }

  /**
   *
   */
  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.file.unref();
    }
  }

  public close() {
    this.stop();

    return this;
  }

  private async onTick() {
    await this.camera.callAsync("capture_preview", this.file.pointer, Context.get().pointer);

    fs.readFile(TMP_PATH, {encoding: "binary"}, (err, data) => {
      this.emit("data", data);
    });
  }
}
