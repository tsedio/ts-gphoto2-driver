import {refType, types} from "ref";
import {GPCodes} from "../types/GPCodes";
import {Pointer} from "../types/Pointer";
import {Ref} from "../types/Ref";
import {PointerCameraList, RefCameraList} from "./GPCameraModule";

/**
 *
 */
export type PointerPortList = Pointer;

/**
 *
 */
export const RefPortList = Ref;
/**
 *
 */
export type PointerPortInfoList = Pointer;
/**
 *
 * @type {Type}
 */
export const RefPortInfoList = Ref;
/**
 *
 */
export type PointerPortInfo = Pointer;

/**
 *
 */
export const RefPortInfo = Ref;

/**
 *
 * @type {any}
 */
export const GPPortInfoModuleDescription = {
  gp_port_result_as_string: [types.CString, ["int"]],
  gp_port_info_list_new: ["void", [refType(RefPortInfoList)]],
  gp_port_info_list_load: ["void", [RefPortInfoList]],
  gp_port_info_list_free: ["int", [RefPortInfoList]],
  gp_port_info_list_get_info: ["int", [RefCameraList, "int", RefPortInfo]]
};

/**
 *
 */
export interface IGPPortInfoModule {
  /**
   *
   * @param {number} arg
   * @returns {string}
   */
  gp_port_result_as_string(arg: number): string; // ["string", ["int"]],
  /**
   *
   * @param {Buffer} buffer
   */
  gp_port_info_list_new(buffer: Buffer): void;

  /**
   *
   * @param portInfoList
   */
  gp_port_info_list_load(portInfoList: PointerPortInfoList): void;

  /**
   *
   * @param portInfoList
   */
  gp_port_info_list_free(portInfoList: PointerPortInfoList): void;

  /**
   *
   * @param cameraList
   * @param {number} index
   * @param portInfo
   * @returns {GPCodes}
   */
  gp_port_info_list_get_info(cameraList: PointerCameraList, index: number, portInfo: PointerPortList): GPCodes;
}
