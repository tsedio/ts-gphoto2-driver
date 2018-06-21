import {refType, types} from "ref";
import {GPCodes} from "../types/GPCodes";
import {Pointer} from "../types/Pointer";
import {Ref} from "../types/Ref";

/**
 *
 */
export type PointerCameraWidget = Pointer;
/**
 *
 */
export const RefCameraWidget = Ref;

/**
 *
 */
export type PointerCameraWidgetType = Pointer;
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
  gp_widget_new(): GPCodes; //, [CameraWidgetType, "string", bufferCameraWidget)]],
  gp_widget_free(): GPCodes; //, [RefCameraWidget]],
  gp_widget_ref(): GPCodes; //, [RefCameraWidget]],
  gp_widget_unref(): GPCodes; //, [RefCameraWidget]],

  gp_widget_append(): GPCodes; //, [RefCameraWidget, RefCameraWidget]],
  gp_widget_prepend(): GPCodes; //, [RefCameraWidget, RefCameraWidget]],
  gp_widget_count_children(): GPCodes; //, [RefCameraWidget]],

  gp_widget_get_child(): GPCodes; //, [RefCameraWidget, "int", bufferCameraWidget)]],
  gp_widget_get_child_by_label(): GPCodes; //, [RefCameraWidget, "string", bufferCameraWidget)]],
  gp_widget_get_child_by_id(): GPCodes; //, [RefCameraWidget, "int", bufferCameraWidget)]],
  gp_widget_get_child_by_name(): GPCodes; //, [RefCameraWidget, "string", bufferCameraWidget)]],
  gp_widget_get_root(): GPCodes; //, [RefCameraWidget, bufferCameraWidget)]],
  gp_widget_get_parent(): GPCodes; //, [RefCameraWidget, bufferCameraWidget)]],

  gp_widget_set_value(): GPCodes; //, [RefCameraWidget, "pointer"]],
  gp_widget_get_value(): GPCodes; //, [RefCameraWidget, "pointer"]],
  gp_widget_set_name(): GPCodes; //, [RefCameraWidget, "string"]],
  gp_widget_get_name(): GPCodes; //, [RefCameraWidget, RefT("string")]],
  gp_widget_set_info(): GPCodes; //, [RefCameraWidget, "string"]],
  gp_widget_get_info(): GPCodes; //, [RefCameraWidget, RefT("string")]],
  gp_widget_get_id(): GPCodes; //, [RefCameraWidget, RefT("int")]],
  gp_widget_get_type(): GPCodes; //, [RefCameraWidget, bufferCameraWidgetType)]],
  gp_widget_get_label(): GPCodes; //, [RefCameraWidget, RefT("string")]],
  gp_widget_set_range(): GPCodes; //, [RefCameraWidget, "float", "float", "float"]],
  gp_widget_get_range(): GPCodes; //, [RefCameraWidget, RefT("float"), RefT("float"), RefT("float")]],
  gp_widget_add_choice(): GPCodes; //, [RefCameraWidget, "string"]],
  gp_widget_count_choices(): GPCodes; //, [RefCameraWidget]],
  gp_widget_get_choice(): GPCodes; //, [RefCameraWidget, "int", RefT("string")]],
  gp_widget_set_changed(): GPCodes; //, [RefCameraWidget, "int"]],
  gp_widget_changed(): GPCodes; //, [RefCameraWidget]],
  gp_widget_set_readonly(): GPCodes; //, [RefCameraWidget, "int"]],
  gp_widget_get_readonly(): GPCodes; //, [RefCameraWidget, RefT("int")]],
}
