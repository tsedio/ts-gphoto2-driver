import {checkCode, GPhoto2Driver} from "../driver";
import {PointerCameraFile, RefCameraFile} from "../driver/modules";
import {PointerWrapper} from "./PointerWrapper";

export class CameraFile extends PointerWrapper<PointerCameraFile> {
  constructor() {
    super("gp_file", RefCameraFile);
  }

  public clean(): void {
    checkCode(GPhoto2Driver.gp_file_clean(this.pointer));
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
