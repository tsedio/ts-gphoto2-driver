import {Pointer, refType} from "../napi/exports";
import {GPCodes} from "../types/GPCodes";

/**
 *
 */
export type PointerList = Pointer<void>;

/**
 *
 */
// tslint:disable-next-line
export const RefList = refType("void");

// tslint:disable-next-line
export const GPListModuleDescription = {
  gp_list_new: ["int", [refType(RefList)]],
  gp_list_ref: ["int", [RefList]],
  gp_list_unref: ["int", [RefList]],
  gp_list_free: ["int", [RefList]],
  gp_list_count: ["int", [RefList]],
  gp_list_append: ["int", [RefList, "string", "string"]],
  gp_list_reset: ["int", [RefList]],
  gp_list_sort: ["int", [RefList]],
  gp_list_find_by_name: ["int", [RefList, "int*", "string"]],
  gp_list_get_name: ["int", [RefList, "int", refType("string")]],
  gp_list_get_value: ["int", [RefList, "int", refType("string")]],
  gp_list_set_name: ["int", [RefList, "int", "string"]],
  gp_list_set_value: ["int", [RefList, "int", "string"]]
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
  gp_list_new(buffer: Pointer<PointerList>): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_ref(cameraList: PointerList): GPCodes; // , [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_unref(cameraList: PointerList): GPCodes; // , [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_free(cameraList: PointerList): GPCodes; // , [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_count(cameraList: PointerList): number; // , [cameraList]],
  /**
   *
   * @param cameraList
   * @param name
   * @param path
   * @returns {GPCodes}
   */
  gp_list_append(cameraList: PointerList, name: string, path: string): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_reset(cameraList: PointerList): GPCodes; // , [cameraList]],
  /**
   *
   * @param {Type} cameraList
   * @returns {GPCodes}
   */
  gp_list_sort(cameraList: PointerList): GPCodes; // , [cameraList]],
  /**
   * Retrieves the index of an arbitrary entry with path.
   * @param cameraList
   * @param index pointer to the result index (may be NULL, only set if found)
   * @param name path of the entry
   * @returns {GPCodes} a gphoto2 error code: GP_OK if found.
   */
  gp_list_find_by_name(cameraList: PointerList, index: number, name: string): GPCodes; // , [cameraList, "int*", "string"]],
  /**
   *
   * @param {Type} cameraList
   * @param index
   * @param name
   * @returns {GPCodes}
   */
  gp_list_get_name(cameraList: PointerList, index: number, name: Pointer<string>): GPCodes;

  /**
   *
   * @param {Type} cameraList
   * @param {number} index
   * @param value
   * @returns {GPCodes}
   */
  gp_list_get_value(cameraList: PointerList, index: number, value: Pointer<string>): GPCodes;

  /**
   *
   * @param {PointerList} cameraList
   * @param {number} index
   * @param {string} value
   * @returns {GPCodes}
   */
  gp_list_set_name(cameraList: PointerList, index: number, value: string): GPCodes;

  /**
   *
   * @param {PointerList} cameraList
   * @param {number} index
   * @param {string} value
   * @returns {GPCodes}
   */
  gp_list_set_value(cameraList: PointerList, index: number, value: string): GPCodes;

  // gp_list_populate(): any; //     ["int", [cameraList, "string", "int"]],
}
