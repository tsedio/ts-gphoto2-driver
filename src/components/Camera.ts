import {checkCode, closeQuietly, GPhoto2Driver} from "../driver";
import {PointerCamera, RefCamera} from "../driver/modules";
import {GPCaptureTypes} from "../driver/types";
import {CameraFile} from "./CameraFile";
import {CameraFilePath} from "./CameraFilePath";
import {Context} from "./Context";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class Camera extends PointerWrapper<PointerCamera> {
  private initialized: boolean = false;
  private closed: boolean = false;

  constructor() {
    super("gp_camera", RefCamera);
  }

  /**
   *
   */
  public initialize(portInfo?: PortInfo): void {
    this.checkNotClosed();
    if (!this.isInitialized()) {
      if (portInfo) {
        this.setPortInfo(portInfo);
      }

      checkCode(GPhoto2Driver.gp_camera_init(this.pointer, Context.get().pointer));
      this.initialized = true;
    }
  }

  /**
   *
   * @returns {boolean}
   */
  public isClosed(): boolean {
    return this.closed;
  }

  /**
   *
   * @returns {boolean}
   */
  public isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * De-initializes the camera and frees all resources. Further invocations to this method do nothing. Any camera method
   * will fail from now on with Error.
   */
  public deinitialize(): void {
    this.checkNotClosed();
    if (this.isInitialized()) {
      this.initialized = false;
      checkCode(GPhoto2Driver.gp_camera_exit(this.pointer, Context.get().pointer));
    }
  }

  /**
   *
   * @returns {this}
   */
  public close(): this {
    if (!this.closed) {
      this.deinitialize();
      this.closed = true;
      super.close();
    }

    return this;
  }

  /**
   *
   */
  private checkNotClosed() {
    if (this.closed) {
      throw new Error("Invalid state: closed");
    }
  }

  /**
   * Captures a quick preview image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public capturePreview(): CameraFile | undefined {
    this.checkNotClosed();
    const cfile = new CameraFile();
    let returnedOk: boolean = false;

    try {
      checkCode(GPhoto2Driver.gp_camera_capture_preview(this.pointer, cfile.pointer, Context.get().pointer));
      returnedOk = true;

      return cfile;
    } finally {
      if (!returnedOk) {
        closeQuietly(cfile);
      }
    }
  }

  /**
   * Captures a full-quality image image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public captureImage(): CameraFile | undefined {
    this.checkNotClosed();

    try {
      const cfile = new CameraFilePath();

      checkCode(GPhoto2Driver.gp_camera_capture(this.pointer, GPCaptureTypes.GP_CAPTURE_IMAGE, cfile.buffer, Context.get().pointer));

      return cfile.newFile(this.pointer);
    } catch (er) {
      console.error(er);
    }
  }

  /**
   *
   */
  ref(): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_ref(this.pointer));
  }

  /**
   *
   */
  unref(): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_unref(this.pointer));
  }

  /**
   *
   * @param {PointerPortInfo} portInfo
   */
  public setPortInfo(portInfo: PortInfo): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_set_port_info(this.pointer, portInfo.pointer));
  }
}
