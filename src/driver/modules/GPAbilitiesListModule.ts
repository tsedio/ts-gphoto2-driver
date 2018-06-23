import {refType} from "ref";
import {PointerOf} from "../types";
import {GPCodes} from "../types/GPCodes";
import {Ref} from "../types/Ref";
import {PointerCameraList, RefCameraList} from "./GPCameraModule";
import {PointerContext, RefContext} from "./GPContextModule";
import {PointerPortInfoList, RefPortInfoList} from "./GPPortInfoModule";

/**
 *
 */
export type PointerAbilityList = PointerOf<void>;
/**
 *
 */
export const RefAbilitiesList = Ref;
/**
 *
 * @type {any}
 */
export const GPAbilitiesListModuleDescription = {
  gp_abilities_list_new: ["void", [refType(RefAbilitiesList)]],
  gp_abilities_list_load: ["int", [RefAbilitiesList, RefContext]],
  gp_abilities_list_detect: ["int", [RefAbilitiesList, RefPortInfoList, RefCameraList, RefContext]],
  gp_abilities_list_free: ["int", [RefAbilitiesList]]
};

/**
 *
 */
export interface IGPAbilitiesListModule {
  /**
   *
   * @param {Buffer} buffer
   */
  gp_abilities_list_new(buffer: PointerOf<PointerAbilityList>): void;

  /**
   *
   * @param abilitiesList
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_abilities_list_load(abilitiesList: PointerAbilityList, context: PointerContext): GPCodes;

  /**
   *
   * @param abilitiesList
   * @param portInfoList
   * @param cameraList
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_abilities_list_detect(
    abilitiesList: PointerAbilityList,
    portInfoList: PointerPortInfoList,
    cameraList: PointerCameraList,
    context: PointerContext
  ): GPCodes;

  /**
   *
   * @param abilitiesList
   * @returns {GPCodes}
   */
  gp_abilities_list_free(abilitiesList: PointerAbilityList): GPCodes;
}
