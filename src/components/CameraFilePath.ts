import {GPCaptureTypes, GPhoto2Driver} from "..";
import {PointerCamera, StructCameraFilePath} from "../driver/modules";
import {PointerOf} from "../driver/types";
import {checkCode, closeQuietly} from "../driver/utils/GPUtils";
import {ICloseable} from "../interfaces";
import {CameraFile} from "./CameraFile";
import {Context} from "./Context";

export class CameraFilePath implements ICloseable {
  readonly buffer: PointerOf<StructCameraFilePath>;

  constructor() {
    const struct = new StructCameraFilePath();
    this.buffer = struct.ref();
  }

  get pointer(): StructCameraFilePath {
    return this.buffer.deref();
  }

  get filename(): string {
    return this.pointer.name.buffer.readCString(0);
  }

  get path(): string {
    return this.pointer.folder.buffer.readCString(0);
  }

  /**
   *
   * @returns {string}
   */
  public toString() {
    return "CameraFilePath{" + this.path + " " + this.filename + "}";
  }

  /**
   * Returns a referenced camera file.
   * @return camera file.
   * @param pCamera
   */
  public newFile(pCamera: PointerCamera) {
    let returnedOk: boolean = false;
    const cameraFile = new CameraFile();

    try {
      const path = this.path;
      const filepath = this.filename;

      checkCode(
        GPhoto2Driver.gp_camera_file_get(
          pCamera,
          path,
          filepath,
          GPCaptureTypes.GP_FILE_TYPE_NORMAL,
          cameraFile.pointer,
          Context.get().pointer
        )
      );
      returnedOk = true;

      return cameraFile;
    } finally {
      if (!returnedOk) {
        closeQuietly(cameraFile);
      }
    }
  }

  /**
   *
   * @returns {this}
   */
  public close(): this {
    return this;
  }
}
