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
export const RefAbilitiesList = refType("void");
/**
 *
 * @type {any}
 */
export const GPAbilitiesListModuleDescription = {
  gp_abilities_list_new: ["void", [refType(RefAbilitiesList)]],
  gp_abilities_list_load: ["int", [RefAbilitiesList, RefContext]],
  gp_abilities_list_detect: ["int", [RefAbilitiesList, RefPortInfoList, RefList, RefContext]],
  gp_abilities_list_free: ["int", [RefAbilitiesList]]
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
    cameraList: PointerOf<PointerList>,
    context: PointerContext
  ): GPCodes;

  /**
   * Free the given CameraAbilitiesList object.
   *
   * @param abilitiesList a CameraAbilitiesList
   * @return a gphoto2 error code
   */
  gp_abilities_list_free(abilitiesList: PointerAbilityList): GPCodes;
}
