import {Pointer} from "../types/Pointer";
import {Ref} from "../types/Ref";

/**
 *
 */
export type PointerContext = Pointer;
/**
 *
 */
export const RefContext = Ref;
/**
 *
 */
export type PointerCB = Pointer;
/**
 *
 * @type {Type}
 */
export const RefCB = Ref;
/**
 *
 * @type {}
 */
export const GPContextModuleDescription = {
  gp_context_new: [RefContext, []],
  gp_context_unref: ["void", [RefContext]],
  gp_context_set_error_func: ["void", [RefContext, RefCB, "void"]],
  gp_context_set_status_func: ["void", [RefContext, RefCB, "void"]]
};

export interface IGPContextModule {
  /**
   * Creates a new context.
   *
   * To be used by the frontend.
   * @returns {PointerContext}
   */
  // gp_context_new(): PointerContext;

  gp_context_new(context: PointerContext): void;

  /**
   * Decrements reference count of a context.
   *
   * Decrement the reference count of a context and free if it goes to 0.
   * @param context The context to drop the reference count.
   */
  gp_context_unref(context: PointerContext): void;

  /**
   *
   * @param {PointerContext} context
   * @param cb
   * @param {null} t
   */
  gp_context_set_error_func(context: PointerContext, cb: PointerCB, t: null): void;

  /**
   *
   * @param {PointerContext} context
   * @param cb
   * @param {null} t
   */
  gp_context_set_status_func(context: PointerContext, cb: PointerCB, t: null): void;
}
