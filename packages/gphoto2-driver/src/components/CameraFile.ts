import {
  checkCode,
  closeQuietly,
  GPCameraFileType,
  GPCodes,
  GPPointer,
  GPPointerString,
  PointerCamera,
  PointerCameraFile,
  PointerOf,
  RefCameraFile
} from "@tsed/gphoto2-core";
import {runMethod, runAsyncMethod} from "@tsed/gphoto2-core";
import {Context} from "./Context";
import {ensureDir, ensureDirSync} from "fs-extra";
import {dirname} from "path";
import {CameraFilePath} from "./CameraFilePath";
import {PointerWrapper, PointerWrapperOptions} from "./PointerWrapper";

export class CameraFile extends PointerWrapper<PointerCameraFile> {
  constructor(options: Partial<PointerWrapperOptions> = {}, ...args: any[]) {
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
   * Get File on camera
   * @param pCamera
   * @param file
   */
  get(pCamera: PointerCamera, file: CameraFilePath = new CameraFilePath()) {
    try {
      runMethod(
        "gp_camera_file_get",
        pCamera,
        file.path,
        file.filename,
        GPCameraFileType.GP_FILE_TYPE_NORMAL,
        this.pointer,
        Context.get().pointer
      );
    } catch (er) {
      closeQuietly(this);
      throw er;
    }

    return file;
  }

  async getAsync(pCamera: PointerCamera, file: CameraFilePath = new CameraFilePath()) {
    try {
      await runAsyncMethod(
        "gp_camera_file_get",
        pCamera,
        file.path,
        file.filename,
        GPCameraFileType.GP_FILE_TYPE_NORMAL,
        this.pointer,
        Context.get().pointer
      );
    } catch (er) {
      closeQuietly(this);
      throw er;
    }

    return file;
  }

  /**
   * Saves the file from the camera to the local file system.
   * @param filename OS-dependent path on the local file system.
   */
  public save(filename: string): GPCodes {
    ensureDirSync(dirname(filename));
    return this.call("save", filename);
  }

  /**
   *
   * @param {string} filename
   * @returns {Promise<GPCodes>}
   */
  public async saveAsync(filename: string): Promise<GPCodes> {
    await ensureDir(dirname(filename));
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
  public async getMimeTypeAsync(mime: PointerOf<string>): Promise<string> {
    const mimePointer = GPPointerString();
    const code = await this.call("get_mime_type", mime);
    checkCode(code);

    return mimePointer.deref();
  }

  /**
   * Get a pointer to the data and the file's size.
   *
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
   * @param encoding
   **/

  public async getDataAndSizeAsync(encoding: "binary" | "base64" = "binary"): Promise<{
    data: Buffer | string;
    size: number;
  }> {
    const dataPointer: PointerOf<string> = GPPointerString();
    const sizePointer: PointerOf<number> = GPPointer("int");

    await this.callAsync("get_data_and_size", dataPointer, sizePointer);

    const size = sizePointer.deref();

    let data: Buffer | string = "";

    switch (encoding) {
      case "binary":
        data = dataPointer;

        break;
      case "base64":
        data = dataPointer.toString("base64");

        break;
    }

    return {
      data,
      size
    };
  }
}
