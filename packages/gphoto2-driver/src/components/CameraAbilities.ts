import {
  Closeable,
  GPCameraDriverStatus,
  GPCameraFileOperation,
  GPCameraFolderOperation,
  GPCameraOperation,
  GPDeviceType,
  GPPortType,
  PointerOf,
  StructCameraAbilities
} from "@tsed/gphoto2-core";

export class CameraAbilities implements Closeable {
  readonly buffer: PointerOf<StructCameraAbilities>;

  constructor() {
    const struct = new StructCameraAbilities();

    this.buffer = struct.ref();
  }

  get pointer(): StructCameraAbilities {
    return this.buffer.deref();
  }

  get model(): string {
    return this.pointer.model.buffer.readCString(0);
  }

  get speed(): number[] {
    return Array.from(this.pointer.speed);
  }

  get port(): GPPortType {
    return this.pointer.port;
  }

  get status(): GPCameraDriverStatus {
    return this.pointer.status;
  }

  get id(): string {
    return this.pointer.id.buffer.readCString(0);
  }

  get library(): string {
    return this.pointer.library.buffer.readCString(0);
  }

  get operation(): GPCameraOperation {
    return this.pointer.operation;
  }

  get fileOperations(): GPCameraFileOperation {
    return this.pointer.file_operations;
  }

  get folderOperations(): GPCameraFolderOperation {
    return this.pointer.folder_operations;
  }

  get usbVendor(): number {
    return this.pointer.usb_vendor;
  }

  get usbProduct(): number {
    return this.pointer.usb_product;
  }

  get usbClass(): number {
    return this.pointer.usb_class;
  }

  get usbSubclass(): number {
    return this.pointer.usb_subclass;
  }

  get usbProtocol(): number {
    return this.pointer.usb_protocol;
  }

  get deviceType(): GPDeviceType {
    return this.pointer.device_type;
  }

  /**
   *
   * @returns {string}
   */
  public toString() {
    return "CameraAbilities{" + this.model + "}";
  }

  /**
   *
   * @returns {this}
   */
  public close(): this {
    return this;
  }
}
