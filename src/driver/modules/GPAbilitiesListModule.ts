import {refType} from "ref";
import {PointerOf} from "../types";
import {GPCodes} from "../types/GPCodes";
import {PointerContext, RefContext} from "./GPContextModule";
import {PointerList, RefList} from "./GPListModule";
import {PointerPortInfoList, RefPortInfoList} from "./GPPortInfoModule";

/**
 *
 */
export type PointerAbilityList = PointerOf<void>;
/**
 *
 */
// tslint:disable-next-line: variable-name
export const RefAbilitiesList = refType("void");
/**
 *
 * @type {any}
 */
// tslint:disable-next-line: variable-name
export const GPAbilitiesListModuleDescription = {
  gp_abilities_list_new: ["void", [refType(RefAbilitiesList)]],
  gp_abilities_list_load: ["int", [RefAbilitiesList, RefContext]],
  gp_abilities_list_detect: ["int", [RefAbilitiesList, RefPortInfoList, RefList, RefContext]],
  gp_abilities_list_free: ["int", [RefAbilitiesList]],
  gp_abilities_list_count: ["int", [RefAbilitiesList]],
  gp_abilities_list_load_dir: ["int", [RefAbilitiesList, refType("string"), RefContext]]
};

/**
 *
 */
export interface IGPAbilitiesListModule {
  /**
   * Allocate the memory for a new abilities list.
   *
   * Function to allocate the memory for a new abilities list.
   *
   * You would then call `gp_abilities_list_load()` in order to
   * populate it.
   *
   * @param abilitiesList CameraAbilitiesList object to initialize
   * @returns gphoto2 error code
   *

   */
  gp_abilities_list_new(abilitiesList: PointerOf<PointerAbilityList>): void;

  /**
   * Scans the system for camera drivers.
   *
   * All supported camera models will then be added to the list.
   *
   * @params list a CameraAbilitiesList
   * @params context a GPContext
   * @returns a gphoto2 error code
   */
  gp_abilities_list_load(abilitiesList: PointerAbilityList, context: PointerContext): GPCodes;

  /**
   *
   * @param {PointerAbilityList} abilitiesList
   * @param {string} dir
   * @param {PointerContext} context
   * @returns {GPCodes}
   */
  gp_abilities_list_load_dir(abilitiesList: PointerAbilityList, dir: string, context: PointerContext): GPCodes;

  /**
   * Tries to detect any camera connected to the computer using the supplied
   * list of supported cameras and the supplied info_list of ports.
   *
   * @returns a gphoto2 error code
   * @param abilitiesList a CameraAbilitiesList
   * @param infoList the GPPortInfoList of ports to use for detection
   * @param cameraList a #CameraList that contains the autodetected cameras after the call
   * @param context a #GPContext
   */
  gp_abilities_list_detect(
    abilitiesList: PointerAbilityList,
    infoList: PointerPortInfoList,
    cameraList: PointerList,
    context: PointerContext
  ): GPCodes;

  /**
   * Free the given CameraAbilitiesList object.
   *
   * @param abilitiesList a CameraAbilitiesList
   * @return a gphoto2 error code
   */
  gp_abilities_list_free(abilitiesList: PointerAbilityList): GPCodes;

  /**
   * Count the entries in the supplied list.
   * @param abilitiesList a #CameraAbilitiesList
   * @returns The number of entries or a gphoto2 error code
   */
  gp_abilities_list_count(abilitiesList: PointerAbilityList): GPCodes;
}
