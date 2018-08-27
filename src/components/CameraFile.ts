import {checkCode, GPPointer, GPPointerString} from "../driver";
import {PointerCameraFile, RefCameraFile} from "../driver/modules";
import {GPCodes, PointerOf} from "../driver/types";
import {IPointerWrapperOptions, PointerWrapper} from "./PointerWrapper";
import {reinterpret} from "ref";
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
  public async getMimeType(mime: PointerOf<string>): Promise<string> {
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

  public async getDataAndSize(
    encoding: "binary" | "base64" = "binary"
  ): Promise<{
    data: Buffer | string;
    size: number;
  }> {
    const dataPointer: PointerOf<Buffer> = GPPointer("char *");
    const sizePointer: PointerOf<number> = GPPointer("int");
    await this.callAsync("get_data_and_size", dataPointer, sizePointer);
    const size = sizePointer.deref();
    const binary = reinterpret(dataPointer.deref(), sizePointer.deref());

    let data: Buffer | string = "";

    switch (encoding) {
      case "binary":
        data = binary;

        break;
      case "base64":
        data = binary.toString("base64");

        break;
    }

    return {
      data,
      size
    };
  }
}
