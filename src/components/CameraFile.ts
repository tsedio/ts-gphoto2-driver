import {checkCode, GPhoto2Driver} from "../driver";
import {PointerCameraFile, RefCameraFile} from "../driver/modules";
import {GPCodes} from "../driver/types";
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
  public save(filename: string): GPCodes {
    return checkCode(GPhoto2Driver.gp_file_save(this.pointer, filename), "gp_file_save");
  }

  /**
   *
   * @param {string} filename
   * @returns {Promise<GPCodes>}
   */
  public async saveAsync(filename: string): Promise<GPCodes> {
    return checkCode(GPhoto2Driver.gp_file_save_async(this.pointer, filename), "gp_file_save_async");
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
