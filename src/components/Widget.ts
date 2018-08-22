import {checkCode, GPhoto2Driver, GPPointerFloat, GPPointerInt, GPPointerRef, GPPointerString, PointerToString} from "../driver";
import {PointerCameraWidget} from "../driver/modules";
import {PointerOf} from "../driver/types";
import {nameOf} from "../driver/utils/ObjectUtils";
import {IWidget} from "../interfaces";
import {WidgetRange} from "./WidgetRange";
import {WidgetTypes} from "./WidgetTypes";

export class Widget implements IWidget {
  cachedValue: any;

  constructor(readonly path: string, readonly pointer: PointerCameraWidget, private cameraWidgets: any) {}

  /**
   * Returns the label of the widget.
   * @return widget label.
   * @deprecated
   */
  get label(): string {
    this.cameraWidgets.checkNotClosed();

    const ref = GPPointerString();

    checkCode(GPhoto2Driver.gp_widget_get_label(this.pointer, ref));

    return ref.deref();
  }

  /**
   * Returns the data type of the widget.
   * @return widget type, never null.
   */
  get type(): WidgetTypes {
    this.cameraWidgets.checkNotClosed();

    const ref = GPPointerInt();

    checkCode(GPhoto2Driver.gp_widget_get_type(this.pointer, ref));

    return WidgetTypes.fromCVal(ref.deref());
  }

  /**
   * Returns the info for the widget.
   * @return widget info.
   * @deprecated
   */
  get info(): string {
    this.cameraWidgets.checkNotClosed();

    const ref = GPPointerString();

    checkCode(GPhoto2Driver.gp_widget_get_info(this.pointer, ref));

    return ref.deref();
  }

  /**
   * Lists choices for given widget. Only applicable to {@link WidgetTypes#RADIO} and {@link WidgetTypes#MENU} types.
   * @return list of possible choices captions.
   */
  get choices() {
    const type = this.type;

    if (!type.hasChoices) {
      return undefined;
    }

    const choiceCount: number = checkCode(GPhoto2Driver.gp_widget_count_choices(this.pointer), "gp_widget_count_choices");
    const result: string[] = [];

    for (let i = 0; i < choiceCount; i++) {
      const ref = GPPointerString();
      checkCode(GPhoto2Driver.gp_widget_get_choice(this.pointer, i, ref), "gp_widget_get_choice");

      result.push(ref.deref());
    }

    return result;
  }

  /**
   * Returns the value of the configuration option.
   * @returns the value.
   */
  get value(): any {
    this.cameraWidgets.checkNotClosed();

    const type = this.type;

    if (this.cachedValue) {
      return this.cachedValue;
    }

    switch (type) {
      case WidgetTypes.TEXT:
      case WidgetTypes.RADIO:
      case WidgetTypes.MENU: {
        const pref = GPPointerRef<void>();
        checkCode(GPhoto2Driver.gp_widget_get_value(this.pointer, pref));
        const p = pref.deref();

        return p == null ? null : PointerToString(p as PointerOf<string>);
      }

      case WidgetTypes.RANGE: {
        const pref = GPPointerFloat();
        checkCode(GPhoto2Driver.gp_widget_get_value(this.pointer, pref));

        return pref.deref();
      }

      case WidgetTypes.TOGGLE: {
        const pref = GPPointerInt();
        checkCode(GPhoto2Driver.gp_widget_get_value(this.pointer, pref));

        return pref.deref() === 2 ? null : pref.deref() === 1;
      }

      case WidgetTypes.DATE: {
        const pref = GPPointerInt();
        checkCode(GPhoto2Driver.gp_widget_get_value(this.pointer, pref));

        return new Date(pref.deref() * 1000.0);
      }

      case WidgetTypes.BUTTON:
        return null;

      default:
        throw new Error("Parameter path: invalid value " + this.path + ": unsupported type: " + type);
    }
  }

  /**
   * Sets the value of given property. The value must be of correct class.
   * <p></p>
   * Important: after the changes are made, the {@link #apply()} method must be called, to apply the new values.
   * @param value the value, may be null.
   */
  set value(value: any) {
    this.cameraWidgets.checkNotClosed();

    if (this.readonly) {
      throw new Error(`Parameter name: invalid value ${this.path} [read-only]`);
    }

    const type = this.type;

    if (!type.acceptsValue(value)) {
      throw new Error(
        `Parameter value: invalid value ${value}: expected ${nameOf(type.valueType)} but got ${value == null ? "null" : nameOf(value)}`
      );
    }

    let ptr;
    switch (type) {
      case WidgetTypes.TEXT:
      case WidgetTypes.RADIO:
      case WidgetTypes.MENU:
        if (value == null) {
          ptr = null;
        } else {
          ptr = GPPointerString(value);
        }
        break;

      case WidgetTypes.RANGE:
        ptr = GPPointerFloat(value);
        break;

      case WidgetTypes.TOGGLE:
        const val = value == null ? 2 : !!value ? 1 : 0;
        ptr = GPPointerInt(val);
        break;

      case WidgetTypes.DATE:
        ptr = GPPointerInt(Math.ceil(new Date(value).getTime() / 1000));
        break;

      case WidgetTypes.BUTTON:
        this.changed = true;

        return;

      default:
        throw new Error("Parameter type: invalid value " + type + ": unsupported");
    }

    checkCode(GPhoto2Driver.gp_widget_set_value(this.pointer, ptr as PointerOf<any>));

    try {
      this.apply();
      this.cachedValue = value;
    } catch (er) {
      throw new Error(`Parameter value: failed to apply value ${value} on ${this.path}. \nError: ` + er.message);
    }
  }

  get changed(): boolean {
    return checkCode(GPhoto2Driver.gp_widget_changed(this.pointer)) === 1;
  }

  set changed(changed: boolean) {
    this.cameraWidgets.checkNotClosed();
    checkCode(GPhoto2Driver.gp_widget_set_changed(this.pointer, changed ? 1 : 0));
  }

  get readonly() {
    this.cameraWidgets.checkNotClosed();

    const result = GPPointerInt();
    checkCode(GPhoto2Driver.gp_widget_get_readonly(this.pointer, result), "gp_widget_get_readonly");

    return result.deref() === 1;
  }

  /**
   * Returns allowed range for {@link WidgetTypes#RANGE} options.
   * @return the range.
   */
  get range(): WidgetRange | undefined {
    if (this.typeOf(WidgetTypes.RANGE)) {
      return new WidgetRange(this.pointer);
    }

    return undefined;
  }

  checkType(...types: WidgetTypes[]): void {
    const type = this.type;
    if (types.indexOf(type) === -1) {
      throw new Error(`Parameter name: invalid value ${name}: expected ${types.join(",")} but got ${type}`);
    }
  }

  typeOf(type: WidgetTypes): boolean {
    return type === this.type;
  }

  /**
   * If the settings are altered, they need to be applied to take effect.
   */
  apply() {
    this.cameraWidgets.checkNotClosed();
    this.cameraWidgets.apply();
  }

  toJSON(): IWidget {
    const {path, label, type, info, value, choices, changed, range} = this;

    return {
      path,
      label,
      type,
      info,
      value,
      choices,
      changed,
      range
    } as any;
  }
}
