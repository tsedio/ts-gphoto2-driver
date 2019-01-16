import {GPhoto2Driver} from "../driver/GPhoto2Driver";
import {PointerContext} from "../driver/modules";
import {ICloseable} from "../interfaces/ICloseable";
import {addInstance, removeInstance} from "./Garbage";

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
    addInstance(this);
  }

  public close(): this {
    GPhoto2Driver.gp_context_unref(this.pointer);
    removeInstance(this);

    return this;
  }

  static get() {
    if (!Context.instance) {
      Context.instance = new Context();
    }

    return Context.instance;
  }
}
