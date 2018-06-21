import {refType, types} from "ref";
import {GPCodes} from "../types/GPCodes";
import {PointerRef} from "../types/Pointer";
import {PointerCameraFile, RefCameraFile} from "./GPCameraModule";

export const GPFileModuleDescription = {
  gp_file_new: ["int", [refType(RefCameraFile)]],
  gp_file_ref: ["int", [RefCameraFile]],
  gp_file_clean: ["int", [RefCameraFile]],
  gp_file_save: ["int", [RefCameraFile, types.CString]],
  gp_file_unref: ["int", [RefCameraFile]]
};

export interface IGPFileModule {
  /**
   *
   * @param {PointerRef<PointerCameraFile>} buffer
   * @returns {GPCodes}
   */
  gp_file_new(buffer: PointerRef<PointerCameraFile>): GPCodes;

  /**
   *
   * @param {PointerCameraFile} cameraFile
   * @param {string} filename
   * @returns {GPCodes}
   */
  gp_file_save(cameraFile: PointerCameraFile, filename: string): GPCodes;

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
}
