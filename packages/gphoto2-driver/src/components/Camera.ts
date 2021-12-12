import {
  GPCameraCaptureType,
  GPCameraDriverStatus,
  GPCameraFileOperation,
  GPCameraFolderOperation,
  GPCodes,
  GPDeviceType,
  GPPortType,
  PointerCamera,
  RefCamera,
  StructCameraText
} from "@tsed/gphoto2-core";
import {$log} from "@tsed/logger";
import {ensureDir, ensureDirSync} from "fs-extra";
import {dirname} from "path";
import {LiveViewOptions} from "../interfaces";
import {CameraAbilities} from "./CameraAbilities";
import {CameraFile} from "./CameraFile";
import {CameraFilePath} from "./CameraFilePath";
import {CameraWidgets} from "./CameraWidgets";
import {Context} from "./Context";
import {LiveView} from "./LiveView";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class Camera extends PointerWrapper<PointerCamera> {
  private initialized = false;
  private closed = false;

  constructor() {
    super({method: "gp_camera", refType: RefCamera});
  }

  private _widgets: CameraWidgets;

  get widgets(): CameraWidgets {
    this.checkNotClosed();

    if (!this._widgets) {
      this._widgets = new CameraWidgets(this);
    }

    return this._widgets;
  }

  static listen(portInfo?: PortInfo) {
    return new Camera().initialize(portInfo);
  }

  autoFocus() {
    try {
      this.widgets.get("/actions/autofocusdrive").value = true;
    } catch (er) {
      $log.warn("Unable to run autofocus command", er);
    }
  }

  openFlash() {
    this.widgets.get("/status/flashopen").value = true;
  }

  /**
   *
   */
  public initialize(portInfo?: PortInfo): this {
    this.checkNotClosed();

    if (!this.isInitialized()) {
      if (portInfo) {
        this.setPortInfo(portInfo);
      }

      this.call("init", Context.get().pointer);

      this.initialized = true;
    }

    return this;
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

  public liveview(options: LiveViewOptions): LiveView {
    this.checkNotClosed();
    this.checkIsInitialized();

    return new LiveView(this, options);
  }

  public async preview(file: CameraFile) {
    return this.callAsync<void>("capture_preview", file.pointer, Context.get().pointer);
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
      await this.preview(file);

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
    path && ensureDirSync(dirname(path));
    return this.capture(GPCameraCaptureType.GP_CAPTURE_IMAGE, path);
  }

  /**
   * Captures a full-quality image image on the camera.
   *
   * @param {string} path Save the captured picture under the given file path.
   * @return camera file, never null. Must be closed afterwards.
   */
  public async captureImageAsync(path?: string): Promise<CameraFile | undefined> {
    path && (await ensureDir(dirname(path)));
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

    const result = await this.callAsync<GPCodes>("trigger_capture", Context.get().pointer);

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
    try {
      const struct = new StructCameraText();
      const buffer = struct.ref();

      this.call("get_manual", buffer, Context.get().pointer);

      return struct.text.buffer.readCString(0);
    } catch (er) {}

    return "";
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

  getAbilitiesInformation() {
    const abilities = this.getAbilities();

    return {
      model: abilities.model,
      port: GPPortType[abilities.port],
      status: GPCameraDriverStatus[abilities.status],
      id: abilities.id,
      library: abilities.library,
      operation: abilities.operation,
      fileOperations: GPCameraFileOperation[abilities.fileOperations],
      folderOperations: GPCameraFolderOperation[abilities.folderOperations],
      usbVendor: abilities.usbVendor,
      usbProduct: abilities.usbProduct,
      usbClass: abilities.usbClass,
      usbSubclass: abilities.usbSubclass,
      deviceType: GPDeviceType[abilities.deviceType],
      speed: abilities.speed
    };
  }

  toString(): string {
    return "Camera: " + this.getAbilities().model;
  }

  /**
   *
   * @param {GPCameraCaptureType} type
   * @param path
   * @returns {CameraFile | undefined}
   */
  protected capture(type: GPCameraCaptureType, path?: string): CameraFile {
    this.checkNotClosed();
    const cFilePath = new CameraFilePath();
    const cameraFile = new CameraFile();

    this.call("capture", type, cFilePath.buffer, Context.get().pointer);

    cameraFile.get(this.pointer, cFilePath);

    if (path) {
      try {
        cameraFile.save(path);
      } finally {
        this.deinitialize();
        this.initialize();
        cameraFile.closeQuietly();
        cFilePath.close();
      }
    }

    return cameraFile;
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
    const cameraFile = new CameraFile();

    await this.callAsync("capture", type, cFilePath.buffer, Context.get().pointer);

    await cameraFile.get(this.pointer, cFilePath);

    if (path) {
      try {
        await cameraFile.saveAsync(path);
      } finally {
        this.deinitialize();
        this.initialize();
        cameraFile.closeQuietly();
        cFilePath.close();
      }
    }

    return cameraFile;
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
   *
   */
  private checkIsInitialized() {
    if (!this.initialized) {
      throw new Error("Invalid state: not initialized");
    }
  }
}
