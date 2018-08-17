import {GPCameraCaptureType, GPCodes} from "../driver";
import {PointerCamera, RefCamera, StructCameraText} from "../driver/modules";
import {ILiveviewOptions} from "../interfaces";
import {CameraAbilities} from "./CameraAbilities";
import {CameraFile} from "./CameraFile";
import {CameraFilePath} from "./CameraFilePath";
import {CameraWidgets} from "./CameraWidgets";
import {Context} from "./Context";
import {Liveview} from "./Liveview";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class Camera extends PointerWrapper<PointerCamera> {
  private initialized: boolean = false;
  private closed: boolean = false;
  private _widgets: CameraWidgets;

  constructor() {
    super({method: "gp_camera", refType: RefCamera});
  }

  get widgets(): CameraWidgets {
    this.checkNotClosed();

    if (!this._widgets) {
      this._widgets = new CameraWidgets(this);
    }

    return this._widgets;
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

      this.call("init", Context.get().pointer);

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
      this.call("exit", Context.get().pointer);
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

  public liveview(options: ILiveviewOptions): Liveview {
    this.checkNotClosed();

    return new Liveview(this, options);
  }

  /**
   * Captures a quick preview image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public capturePreview(path?: string, file: CameraFile = new CameraFile()): CameraFile | undefined {
    this.checkNotClosed();

    try {
      this.call("capture_preview", file.pointer, Context.get().pointer);

      if (path) {
        try {
          file.save(path);
        } finally {
          this.deinitialize();
          this.initialize();
          file.closeQuietly();
        }
      }

      return file;
    } catch (er) {
      file.closeQuietly();
      throw er;
    }
  }

  /**
   * Captures a quick preview image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public async capturePreviewAsync(path?: string, file: CameraFile = new CameraFile()): Promise<CameraFile | undefined> {
    this.checkNotClosed();

    try {
      await this.callAsync("capture_preview", file.pointer, Context.get().pointer);

      if (path) {
        try {
          await file.saveAsync(path);
        } finally {
          this.deinitialize();
          this.initialize();
          file.closeQuietly();
        }
      }

      return file;
    } catch (er) {
      file.closeQuietly();
      throw er;
    }
  }

  /**
   * Captures a full-quality image image on the camera.
   *
   * @param {string} path Save the captured picture under the given file path.
   * @return camera file, never null. Must be closed afterwards.
   */
  public captureImage(path?: string): CameraFile | undefined {
    return this.capture(GPCameraCaptureType.GP_CAPTURE_IMAGE, path);
  }

  /**
   * Captures a full-quality image image on the camera.
   *
   * @param {string} path Save the captured picture under the given file path.
   * @return camera file, never null. Must be closed afterwards.
   */
  public captureImageAsync(path?: string): Promise<CameraFile | undefined> {
    return this.captureAsync(GPCameraCaptureType.GP_CAPTURE_IMAGE, path);
  }

  /**
   *
   * @returns {CameraFile | undefined}
   */
  public captureVideo(): CameraFile | undefined {
    return this.capture(GPCameraCaptureType.GP_CAPTURE_MOVIE);
  }

  /**
   *
   * @returns {CameraFile | undefined}
   */
  public captureVideoAsync(): Promise<CameraFile | undefined> {
    return this.captureAsync(GPCameraCaptureType.GP_CAPTURE_MOVIE);
  }

  /**
   *
   * @returns {CameraFile | undefined}
   */
  public captureSound(): CameraFile | undefined {
    return this.capture(GPCameraCaptureType.GP_CAPTURE_SOUND);
  }

  /**
   *
   * @returns {CameraFile | undefined}
   */
  public captureSoundAsync(): Promise<CameraFile | undefined> {
    return this.captureAsync(GPCameraCaptureType.GP_CAPTURE_SOUND);
  }

  /**
   *
   * @param {GPCameraCaptureType} type
   * @param path
   * @returns {CameraFile | undefined}
   */
  protected capture(type: GPCameraCaptureType, path?: string): CameraFile | undefined {
    this.checkNotClosed();
    const cFilePath = new CameraFilePath();

    this.call("capture", type, cFilePath.buffer, Context.get().pointer);

    const cFile = cFilePath.newFile(this.pointer);

    if (path && cFile) {
      try {
        cFile.save(path);
      } finally {
        this.deinitialize();
        this.initialize();
        cFile.closeQuietly();
        cFilePath.close();
      }
    }

    return cFile;
  }

  /**
   *
   * @param {GPCameraOperation} type
   * @param path
   * @returns {CameraFile | undefined}
   */
  protected async captureAsync(type: GPCameraCaptureType, path?: string): Promise<CameraFile | undefined> {
    this.checkNotClosed();
    const cFilePath = new CameraFilePath();

    await this.callAsync("capture", type, cFilePath.buffer, Context.get().pointer);

    const cFile = await cFilePath.newFileAsync(this.pointer);

    if (path && cFile) {
      try {
        await cFile.saveAsync(path);
      } finally {
        this.deinitialize();
        this.initialize();
        cFile.closeQuietly();
        cFilePath.close();
      }
    }

    return cFile;
  }

  /**
   *
   */
  public triggerCapture(): GPCodes {
    this.checkNotClosed();

    const result = this.call("trigger_capture", Context.get().pointer);

    this.deinitialize();
    this.initialize();

    return result;
  }

  /**
   *
   */
  public async triggerCaptureAsync(): Promise<GPCodes> {
    this.checkNotClosed();

    const result = await this.callAsync("trigger_capture", Context.get().pointer);

    this.deinitialize();
    this.initialize();

    return result;
  }

  /**
   *
   */
  public getAbilities() {
    const abilities = new CameraAbilities();

    this.call("get_abilities", abilities.buffer);

    return abilities;
  }

  /**
   *
   * @returns {string}
   */
  public getSummary(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    this.call("get_summary", buffer, Context.get().pointer);

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public getAbout(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    this.call("get_about", buffer, Context.get().pointer);

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public getManual(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    this.call("get_manual", buffer, Context.get().pointer);

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   */
  public ref(): GPCodes {
    this.checkNotClosed();

    return this.call("ref");
  }

  /**
   *
   */
  public unref(): GPCodes {
    this.checkNotClosed();

    return this.call("unref");
  }

  /**
   *
   * @param {PointerPortInfo} portInfo
   */
  public setPortInfo(portInfo: PortInfo): GPCodes {
    this.checkNotClosed();

    return this.call("set_port_info", portInfo.pointer);
  }

  toString(): string {
    return "Camera: " + this.getAbilities().model;
  }
}
