import {GPCodes, GPFileTypes, GPhoto2Driver} from "..";
import {PointerCamera, StructCameraFilePath} from "../driver/modules";
import {checkCode, closeQuietly} from "../driver/utils/GPUtils";
import {ICloseable} from "../interfaces";
import {CameraFile} from "./CameraFile";
import {Context} from "./Context";

export class CameraFilePath implements ICloseable {
  readonly pointer = new StructCameraFilePath();

  public filename: string;
  public path: string;

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
      checkCode(
        GPhoto2Driver.gp_camera_file_get(
          pCamera,
          this.path,
          this.filename,
          GPFileTypes.GP_FILE_TYPE_NORMAL,
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
