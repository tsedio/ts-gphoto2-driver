import {GPhoto2Driver} from "../driver/GPhoto2Driver";
import {PointerContext} from "../driver/modules";
import {ICloseable} from "../interfaces/ICloseable";

export class Context implements ICloseable {
  /**
   *
   * @type {PointerContext}
   */
  readonly pointer: PointerContext = GPhoto2Driver.gp_context_new();
  /**
   *
   */
  private static instance: Context;

  constructor() {
    // GPhoto2Driver.gp_context_set_error_func(this.pointer, this.onError, null);
    // GPhoto2Driver.gp_context_set_status_func(this.pointer, this.onStatus, null);
  }

  public close(): this {
    GPhoto2Driver.gp_context_unref(this.pointer);

    return this;
  }

  /**
   *
   * @param {PointerContext} context
   * @param {string} str
   * @param data
   */
  // private onError(context: PointerContext, str: string, data: any) {
  // fprintf(stderr, "### %s\n", str);
  //  console.error(str);
  // }

  // private onStatus(context: PointerContext, str: string, data: any) {
  // fprintf(stderr, "### %s\n", str);
  // console.error(str);
  // }

  static get() {
    if (!Context.instance) {
      Context.instance = new Context();
    }

    return Context.instance;
  }
}
