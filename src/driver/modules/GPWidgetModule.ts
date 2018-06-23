import {refType, types} from "ref";
import {GPCodes, PointerOf, PointerRef, Ref} from "../types";

/**
 *
 */
export type PointerCameraWidget = PointerOf<void>;
/**
 *
 */
export const RefCameraWidget = Ref;

/**
 *
 */
export type PointerCameraWidgetType = PointerOf<number>;
/**
 *
 * @type {Type}
 */
export const RefCameraWidgetType = refType("int");
/**
 *
 * @type {}
 */
export const GPWidgetModuleDescription: any = {
  gp_widget_new: ["int", [RefCameraWidgetType, types.CString, refType(RefCameraWidget)]],
  gp_widget_free: ["int", [RefCameraWidget]],
  gp_widget_ref: ["int", [RefCameraWidget]],
  gp_widget_unref: ["int", [RefCameraWidget]],

  gp_widget_append: ["int", [RefCameraWidget, RefCameraWidget]],
  gp_widget_prepend: ["int", [RefCameraWidget, RefCameraWidget]],
  gp_widget_count_children: ["int", [RefCameraWidget]],

  gp_widget_get_child: ["int", [RefCameraWidget, "int", refType(RefCameraWidget)]],
  gp_widget_get_child_by_label: ["int", [RefCameraWidget, types.CString, refType(RefCameraWidget)]],
  gp_widget_get_child_by_id: ["int", [RefCameraWidget, "int", refType(RefCameraWidget)]],
  gp_widget_get_child_by_name: ["int", [RefCameraWidget, types.CString, refType(RefCameraWidget)]],
  gp_widget_get_root: ["int", [RefCameraWidget, refType(RefCameraWidget)]],
  gp_widget_get_parent: ["int", [RefCameraWidget, refType(RefCameraWidget)]],

  gp_widget_set_value: ["int", [RefCameraWidget, "pointer"]],
  gp_widget_get_value: ["int", [RefCameraWidget, "pointer"]],
  gp_widget_set_name: ["int", [RefCameraWidget, types.CString]],
  gp_widget_get_name: ["int", [RefCameraWidget, refType(types.CString)]],
  gp_widget_set_info: ["int", [RefCameraWidget, types.CString]],
  gp_widget_get_info: ["int", [RefCameraWidget, refType(types.CString)]],
  gp_widget_get_id: ["int", [RefCameraWidget, refType("int")]],
  gp_widget_get_type: ["int", [RefCameraWidget, refType(RefCameraWidgetType)]],
  gp_widget_get_label: ["int", [RefCameraWidget, refType(types.CString)]],
  gp_widget_set_range: ["int", [RefCameraWidget, "float", "float", "float"]],
  gp_widget_get_range: ["int", [RefCameraWidget, refType("float"), refType("float"), refType("float")]],
  gp_widget_add_choice: ["int", [RefCameraWidget, types.CString]],
  gp_widget_count_choices: ["int", [RefCameraWidget]],
  gp_widget_get_choice: ["int", [RefCameraWidget, "int", refType(types.CString)]],
  gp_widget_set_changed: ["int", [RefCameraWidget, "int"]],
  gp_widget_changed: ["int", [RefCameraWidget]],
  gp_widget_set_readonly: ["int", [RefCameraWidget, "int"]],
  gp_widget_get_readonly: ["int", [RefCameraWidget, refType("int")]]
};

/**
 *
 */
export interface IGPWidgetModule {
  /**
   * \brief Create a new widget.
   *
   * The function creates a new #CameraWidget of specified type and with
   * given label.
   *
   * @param {number} type the type
   * @param {string} label the label
   * @param {PointerOf<PointerCameraWidget>} widget
   * @returns {GPCodes} a gphoto2 error code.
   **/
  gp_widget_new(type: number, label: string, widget: PointerOf<PointerCameraWidget>): GPCodes; //, [RefCameraWidgetType, "string", bufferCameraWidget)]],

  /**
   * Frees a CameraWidget
   *
   * @param {PointerCameraWidget} widget the #CameraWidget to be freed
   * @returns {GPCodes} a gphoto2 error code.
   **/
  gp_widget_free(widget: PointerCameraWidget): GPCodes;

  /**
   * Increments the reference count for the CameraWidget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget you want to ref-count
   * @returns {GPCodes} a gphoto2 error code.
   **/
  gp_widget_ref(widget: PointerCameraWidget): GPCodes;

  /**
   * Decrements the reference count for the CameraWidget
   *
   * @param {PointerCameraWidget} widget a CameraWidget you want to unref
   * @returns {GPCodes} a gphoto2 error code.
   **/
  gp_widget_unref(widget: PointerCameraWidget): GPCodes;


  gp_widget_append(widget1: PointerCameraWidget, widget2: PointerCameraWidget): GPCodes;

  gp_widget_prepend(widget1: PointerCameraWidget, widget2: PointerCameraWidget): GPCodes;

  /**
   *
   * @param {PointerCameraWidget} widget
   * @returns {GPCodes}
   */
  gp_widget_count_children(widget: PointerCameraWidget): GPCodes;

  gp_widget_get_child(widget: PointerCameraWidget, index: number, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  gp_widget_get_child_by_label(widget: PointerCameraWidget, label: string, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  gp_widget_get_child_by_id(widget: PointerCameraWidget, id: number, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  gp_widget_get_child_by_name(widget: PointerCameraWidget, name: string, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  gp_widget_get_root(widget: PointerCameraWidget, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  gp_widget_get_parent(widget: PointerCameraWidget, buffer: PointerOf<PointerCameraWidget>): GPCodes;

  /**
   * Sets the value of the widget
   *
   * Please pass
   * (char*) for GP_WIDGET_MENU, GP_WIDGET_TEXT, GP_WIDGET_RADIO,
   * (float) for GP_WIDGET_RANGE,
   * (int)   for GP_WIDGET_DATE, GP_WIDGET_TOGGLE, and
   * (CameraWidgetCallback) for GP_WIDGET_BUTTON.
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerOf<void>} value
   * @returns a gphoto2 error code.
   *
   **/
  gp_widget_set_value(widget: PointerCameraWidget, value: PointerOf<void>): GPCodes;

  /**
   * Retrieves the value of the #CameraWidget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerOf<void>} value
   * @returns a gphoto2 error code.
   *
   **/
  gp_widget_get_value(widget: PointerCameraWidget, value: PointerOf<void>): GPCodes;


  gp_widget_set_name(): GPCodes; //, [RefCameraWidget, "string"]],

  /**
   * Gets the name of the widget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerRef<string>} name Name of above widget
   * @return a gphoto2 error code.
   **/
  gp_widget_get_name(widget: PointerCameraWidget, name: PointerRef<string>): GPCodes;

  /**
   * Sets the information about the widget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {string} info Information about above widget
   * @return a gphoto2 error code.
   *
   **/
  gp_widget_set_info(widget: PointerCameraWidget, info: string): GPCodes;

  /**
   * Retrieves the information about the widget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerRef<string>} info
   * @return {GPCodes} a gphoto2 error code.
   *
   **/
  gp_widget_get_info(widget: PointerCameraWidget, info: PointerRef<string>): GPCodes;

  /**
   * Retrieves the unique id of the #CameraWidget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerRef<string>} id
   * @return {GPCodes} a gphoto2 error code.
   *
   **/
  gp_widget_get_id(widget: PointerCameraWidget, id: PointerOf<number>): GPCodes;

  /**
   * Retrieves the type of the #CameraWidget
   *
   * @param {PointerCameraWidget} widget a #CameraWidget
   * @param {PointerRef<number>} type
   * @return {GPCodes} a gphoto2 error code.
   *
   **/
  gp_widget_get_type(widget: PointerCameraWidget, type: PointerOf<number>): GPCodes;

  gp_widget_get_label(widget: PointerCameraWidget, label: PointerRef<string>): GPCodes;

  gp_widget_set_range(widget: PointerCameraWidget, range1: number, range2: number, range3: number): GPCodes;

  /**
   * Retrieves some range parameters of the #CameraWidget
   *
   * @param range a #CameraWidget of type GP_WIDGET_RANGE
   * @param min
   * @param max
   * @param increment
   * @return a gphoto2 error code.
   *
   **/

  gp_widget_get_range(range: PointerCameraWidget, min: PointerOf<number>, max: PointerOf<number>, increment: PointerOf<number>): GPCodes;

  gp_widget_add_choice(): GPCodes; //, [RefCameraWidget, "string"]],
  gp_widget_count_choices(): GPCodes; //, [RefCameraWidget]],

  /**
   * Retrieves the choice number \c choice_number
   *
   * @param {PointerCameraWidget} widget a #CameraWidget of type GP_WIDGET_RADIO or GP_WIDGET_MENU
   * @param {number} choice_number
   * @param {PointerRef<string>} choice
   * @return a gphoto2 error code
   *
   **/
  gp_widget_get_choice(widget: PointerCameraWidget, choice_number: number, choice: PointerRef<string>): GPCodes;

  gp_widget_set_changed(widget: PointerCameraWidget, changed: number): GPCodes;

  /**
   * Tells if the widget has been changed
   *
   * Returns 1 if the state of the #CameraWidget has been changed or 0 if not.
   *
   * @note this formerly cleared the changed state. It no longer does with 2.5.11.
   * @param widget a #CameraWidget
   * @return a gphoto2 error code or changed flag.
   *
   **/
  gp_widget_changed(widget: PointerCameraWidget): GPCodes;

  /**
   * Tells that the widget is readonly
   *
   * Sets the readonly of the CameraWidget depending on
   * the changed parameter.
   *
   * Only useful when called from the camera driver.
   *
   * @param widget a #CameraWidget
   * @param readonly a boolean whether we are readonly or not
   * @return a gphoto2 error code
   *
   *
   */
  gp_widget_set_readonly(widget: PointerCameraWidget, readonly: number): GPCodes;

  /**
   * Retrieves the readonly state of the #CameraWidget
   *
   * @param widget a #CameraWidget
   * @param readonly
   * @return a gphoto2 error code.
   *
   */
  gp_widget_get_readonly(widget: PointerCameraWidget, readonly: PointerOf<number>): GPCodes;
}
