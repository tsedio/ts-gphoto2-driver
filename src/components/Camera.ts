import {checkCode, closeQuietly, GPCaptureTypes, GPhoto2Driver} from "../driver";
import {PointerCamera, PointerPortInfo} from "../driver/modules";
import {CameraFile} from "./CameraFile";
import {CameraFilePath} from "./CameraFilePath";
import {Context} from "./Context";
import {PointerWrapper} from "./PointerWrapper";

export class Camera extends PointerWrapper<PointerCamera> {
  private initialized: boolean = false;
  private closed: boolean = false;

  constructor() {
    super("gp_camera");
  }

  /**
   *
   */
  public initialize(): void {
    this.checkNotClosed();
    if (!this.isInitialized()) {
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
  public capturePreview(): CameraFile {
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
   * Returns new configuration for the camera.
   * @return the configuration, never null. Must be closed afterwards.
   */

  /* public newConfiguration(): CameraWidgets {
    this.checkNotClosed();

    return new CameraWidgets(this);
  } */

  /**
   * Captures a full-quality image image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public captureImage(): CameraFile {
    this.checkNotClosed();
    const path = new CameraFilePath();

    checkCode(GPhoto2Driver.gp_camera_capture(this.pointer, GPCaptureTypes.GP_CAPTURE_IMAGE, path.pointer, Context.get().pointer));

    return path.newFile(this.pointer);
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
  public setPortInfo(portInfo: PointerPortInfo): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_set_port_info(this.pointer, portInfo));
  }
}
