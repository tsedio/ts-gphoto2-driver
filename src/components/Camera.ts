import {checkCode, GPCameraCaptureType, GPhoto2Driver} from "../driver";
import {PointerCamera, RefCamera, StructCameraText} from "../driver/modules";
import {GPCodes} from "../driver/types";
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
    super("gp_camera", RefCamera);
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

  public liveview(): Liveview {
    this.checkNotClosed();

    // this.ref();

    return new Liveview(this.pointer);
  }

  /**
   * Captures a quick preview image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public capturePreview(path?: string): CameraFile | undefined {
    this.checkNotClosed();
    const cFile = new CameraFile();

    try {
      const result = GPhoto2Driver.gp_camera_capture_preview(this.pointer, cFile.pointer, Context.get().pointer);
      checkCode(result, "gp_camera_capture_preview");

      if (path) {
        try {
          cFile.save(path);
        } finally {
          this.deinitialize();
          this.initialize();
          cFile.closeQuietly();
        }
      }

      return cFile;
    } catch (er) {
      cFile.closeQuietly();
      throw er;
    }
  }

  /**
   * Captures a quick preview image on the camera.
   * @return camera file, never null. Must be closed afterwards.
   */
  public async capturePreviewAsync(path?: string): Promise<CameraFile | undefined> {
    this.checkNotClosed();
    const cFile = new CameraFile();

    try {
      const result = await GPhoto2Driver.gp_camera_capture_preview_async(this.pointer, cFile.pointer, Context.get().pointer);
      checkCode(result, "gp_camera_capture_preview_async");

      if (path) {
        try {
          await cFile.saveAsync(path);
        } finally {
          this.deinitialize();
          this.initialize();
          cFile.closeQuietly();
        }
      }

      return cFile;
    } catch (er) {
      cFile.closeQuietly();
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
    const result = GPhoto2Driver.gp_camera_capture(this.pointer, type, cFilePath.buffer, Context.get().pointer);

    checkCode(result, "gp_camera_capture");

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

    const result = await GPhoto2Driver.gp_camera_capture_async(this.pointer, type, cFilePath.buffer, Context.get().pointer);

    checkCode(result, "gp_camera_capture_async");

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

    const result = GPhoto2Driver.gp_camera_trigger_capture(this.pointer, Context.get().pointer);

    checkCode(result, "gp_camera_trigger_capture");

    this.deinitialize();
    this.initialize();

    return result;
  }

  /**
   *
   */
  public async triggerCaptureAsync(): Promise<GPCodes> {
    this.checkNotClosed();

    const result = await GPhoto2Driver.gp_camera_trigger_capture_async(this.pointer, Context.get().pointer);

    checkCode(result, "gp_camera_trigger_capture_async");

    this.deinitialize();
    this.initialize();

    return result;
  }

  /**
   *
   */
  public getAbilities() {
    const abilities = new CameraAbilities();

    checkCode(GPhoto2Driver.gp_camera_get_abilities(this.pointer, abilities.buffer), "gp_camera_get_abilities");

    return abilities;
  }

  /**
   *
   * @returns {string}
   */
  public getSummary(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    checkCode(GPhoto2Driver.gp_camera_get_summary(this.pointer, buffer, Context.get().pointer), "gp_camera_get_summary");

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public getAbout(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    checkCode(GPhoto2Driver.gp_camera_get_about(this.pointer, buffer, Context.get().pointer), "gp_camera_get_about");

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public getManual(): string {
    const struct = new StructCameraText();
    const buffer = struct.ref();

    checkCode(GPhoto2Driver.gp_camera_get_manual(this.pointer, buffer, Context.get().pointer), "gp_camera_get_manual");

    return struct.text.buffer.readCString(0);
  }

  /**
   *
   */
  public ref(): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_ref(this.pointer));
  }

  /**
   *
   */
  public unref(): void {
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

  toString(): string {
    return "Camera: " + this.getAbilities().model;
  }
}
