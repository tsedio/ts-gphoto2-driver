import {refType, types} from "ref";
import {GPCodes, PointerOf} from "../types";
import {PointerCameraList, RefCameraList} from "./GPCameraModule";

/**
 *
 */
export type PointerList = PointerOf<void>;

export const GPListModuleDescription = {
  gp_list_new: ["int", [refType(RefCameraList)]],
  gp_list_ref: ["int", [RefCameraList]],
  gp_list_unref: ["int", [RefCameraList]],
  gp_list_free: ["int", [RefCameraList]],
  gp_list_count: ["int", [RefCameraList]],
  gp_list_append: ["int", [RefCameraList, types.CString, types.CString]],
  gp_list_reset: ["int", [RefCameraList]],
  gp_list_sort: ["int", [RefCameraList]],
  gp_list_find_by_name: ["int", [RefCameraList, "int*", types.CString]],
  gp_list_get_name: ["int", [RefCameraList, "int", refType(types.CString)]],
  gp_list_get_value: ["int", [RefCameraList, "int", refType(types.CString)]],
  gp_list_set_name: ["int", [RefCameraList, "int", types.CString]],
  gp_list_set_value: ["int", [RefCameraList, "int", types.CString]]
  // "gp_list_populate":     ["int", [RefCameraList, types.CString, "int"]],
};

/**
 *
 */
export interface IGPListModule {
  /**
   *
   * @returns {GPCodes}
   * @param buffer
   */
  gp_list_new(buffer: PointerOf<PointerCameraList>): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_ref(cameraList: PointerCameraList): GPCodes; //, [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_unref(cameraList: PointerCameraList): GPCodes; //, [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_free(cameraList: PointerCameraList): GPCodes; //, [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_count(cameraList: PointerCameraList): number; //, [cameraList]],
  /**
   *
   * @param cameraList
   * @param name
   * @param path
   * @returns {GPCodes}
   */
  gp_list_append(cameraList: PointerCameraList, name: string, path: string): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_reset(cameraList: PointerCameraList): GPCodes; //, [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_sort(cameraList: PointerCameraList): GPCodes; //, [cameraList]],
  /**
   * Retrieves the index of an arbitrary entry with name.
   * @param cameraList
   * @param index pointer to the result index (may be NULL, only set if found)
   * @param name name of the entry
   * @returns {GPCodes} a gphoto2 error code: GP_OK if found.
   */
  gp_list_find_by_name(cameraList: PointerCameraList, index: number, name: string): GPCodes; //, [cameraList, "int*", "string"]],
  /**
   *
   * @param {Type} cameraList
   * @param index
   * @param buffer
   * @returns {GPCodes}
   */
  gp_list_get_name(cameraList: PointerCameraList, index: number, buffer: Buffer): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @param {number} index
   * @param {Buffer} buffer
   * @returns {GPCodes}
   */
  gp_list_get_value(cameraList: PointerCameraList, index: number, buffer: Buffer): GPCodes;

  /**
   *
   * @param {PointerCameraList} cameraList
   * @param {number} index
   * @param {string} value
   * @returns {GPCodes}
   */
  gp_list_set_name(cameraList: PointerCameraList, index: number, value: string): GPCodes;

  /**
   *
   * @param {PointerCameraList} cameraList
   * @param {number} index
   * @param {string} value
   * @returns {GPCodes}
   */
  gp_list_set_value(cameraList: PointerCameraList, index: number, value: string): GPCodes;

  // gp_list_populate(): any; //     ["int", [cameraList, "string", "int"]],
}
