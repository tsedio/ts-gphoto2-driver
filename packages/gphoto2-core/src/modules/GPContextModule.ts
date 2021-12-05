import {Pointer, refType} from "../napi/exports";

/**
 *
 */
export type PointerContext = Pointer<void>;
/**
 *
 */
// tslint:disable-next-line
export const RefContext = refType("void");
/**
 *
 */
export type PointerCB = Pointer<void>;
/**
 *
 * @type {Type}
 */
// tslint:disable-next-line
export const RefCB = refType("void");
/**
 *
 * @type {}
 */
// tslint:disable-next-line
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
  gp_context_new(): PointerContext;

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
