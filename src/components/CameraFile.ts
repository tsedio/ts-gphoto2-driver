import {checkCode, GPhoto2Driver, newPointerCameraFile} from "../driver";
import {ICloseable} from "../interfaces";

export class CameraFile implements ICloseable {
  readonly pointer = newPointerCameraFile();

  public clean(): void {
    checkCode(GPhoto2Driver.gp_file_clean(this.pointer));
  }

  /**
   * Closes this file link and frees allocated resources.
   */
  public close(): this {
    checkCode(GPhoto2Driver.gp_file_free(this.pointer));

    return this;
  }

  /**
   * Saves the file from the camera to the local file system.
   * @param filename OS-dependent path on the local file system.
   */
  public save(filename: string) {
    checkCode(GPhoto2Driver.gp_file_save(this.pointer, filename));
  }

  /**
   *
   */
  public ref() {
    checkCode(GPhoto2Driver.gp_file_ref(this.pointer));
  }

  /**
   *
   */
  public unref() {
    checkCode(GPhoto2Driver.gp_file_unref(this.pointer));
  }
}
