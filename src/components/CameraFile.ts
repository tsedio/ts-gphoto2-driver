import {PointerCameraFile, RefCameraFile} from "../driver/modules";
import {GPCodes, PointerOf} from "../driver/types";
import {IPointerWrapperOptions, PointerWrapper} from "./PointerWrapper";

export class CameraFile extends PointerWrapper<PointerCameraFile> {
  constructor(options: Partial<IPointerWrapperOptions> = {}, ...args: any[]) {
    super(
      {
        ...options,
        method: "gp_file",
        refType: RefCameraFile
      },
      ...args
    );
  }

  public clean(): void {
    return this.call("clean");
  }

  public free(): void {
    return this.call("free");
  }

  /**
   * Saves the file from the camera to the local file system.
   * @param filename OS-dependent path on the local file system.
   */
  public save(filename: string): GPCodes {
    return this.call("save", filename);
  }

  /**
   *
   * @param {string} filename
   * @returns {Promise<GPCodes>}
   */
  public async saveAsync(filename: string): Promise<GPCodes> {
    return this.callAsync("save", filename);
  }

  /**
   *
   */
  public ref() {
    return this.call("ref");
  }

  /**
   *
   */
  public unref(): GPCodes {
    return this.call("unref");
  }

  /**
   *
   * @param {PointerOf<string>} mime
   * @returns {GPCodes}
   */
  public getMimeType(mime: PointerOf<string>): GPCodes {
    return this.call("get_mime_type", mime);
  }

  /**
   * Get a pointer to the data and the file's size.
   *
   * @param data
   * @param size
   * @return a gphoto2 error code.
   *
   * Both data and size can be NULL and will then be ignored.
   *
   * For regular CameraFiles, the pointer to data that is returned is
   * still owned by libgphoto2 and its lifetime is the same as the #file.
   *
   * For filedescriptor or handler based CameraFile types, the returned
   * data pointer is owned by the caller and needs to be free()d to avoid
   * memory leaks.
   *
   **/
  public getDataAndSize(data: PointerOf<string>, size: PointerOf<number>): GPCodes {
    return this.call("get_data_and_size", data, size);
  }
}
