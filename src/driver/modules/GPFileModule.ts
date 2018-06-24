import {refType, types} from "ref";
import {GPCodes, PointerOf} from "../types";
import {PointerCameraFile, RefCameraFile} from "./GPCameraModule";

export const GP_FILE_MODULE_ASYNC_KEYS: string[] = ["gp_file_save"];

// tslint:disable-next-line: variable-name
export const GPFileModuleDescription = {
  gp_file_new: ["int", [refType(RefCameraFile)]],
  gp_file_ref: ["int", [RefCameraFile]],
  gp_file_clean: ["int", [RefCameraFile]],
  gp_file_save: ["int", [RefCameraFile, types.CString]],
  gp_file_unref: ["int", [RefCameraFile]],
  gp_file_free: ["int", [RefCameraFile]]
};

export interface IGPFileModule {
  /**
   *
   * @param {PointerOf<PointerCameraFile>} buffer
   * @returns {GPCodes}
   */
  gp_file_new(buffer: PointerOf<PointerCameraFile>): GPCodes;

  /**
   *
   * @param {PointerCameraFile} cameraFile
   * @param {string} filename
   * @returns {GPCodes}
   */
  gp_file_save(cameraFile: PointerCameraFile, filename: string): GPCodes;

  /**
   *
   * @param {PointerCameraFile} cameraFile
   * @param {string} filename
   * @returns {Promise<GPCodes>}
   */
  gp_file_save_async(cameraFile: PointerCameraFile, filename: string): Promise<GPCodes>;

  /**
   *
   * @param {} cameraFile
   * @returns {}
   */
  gp_file_ref(cameraFile: PointerCameraFile): GPCodes;

  /**
   *
   * @param {PointerCameraFile} cameraFile
   * @returns {GPCodes}
   */
  gp_file_unref(cameraFile: PointerCameraFile): GPCodes;

  /**
   *
   * @param {PointerCameraFile} cameraFile
   * @returns {GPCodes}
   */
  gp_file_free(cameraFile: PointerCameraFile): GPCodes;

  /**
   *
   * @param {gp_file_clean} cameraFile
   * @returns {GPCodes}
   */
  gp_file_clean(cameraFile: PointerCameraFile): GPCodes;

  /**
   * Get a pointer to the data and the file's size.
   *
   * @param file a #CameraFile
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
  gp_file_get_data_and_size(file: PointerCameraFile, data: PointerOf<string>, size: PointerOf<number>): GPCodes;
}