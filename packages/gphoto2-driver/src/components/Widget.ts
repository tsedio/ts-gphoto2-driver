import {$log} from "@tsed/logger";
import {GPPointerFloat, GPPointerInt, GPPointerRef, GPPointerString, PointerCameraWidget, pointerToString} from "@tsed/gphoto2-core";
import type {Pointer} from "ref-napi";
import {WidgetProps} from "../interfaces/WidgetProps";
import {WidgetRange} from "./WidgetRange";
import {WidgetTypes} from "./WidgetTypes";
import {CallablePointer} from "./PointerWrapper";

export class Widget extends CallablePointer<PointerCameraWidget> {
  /**
   * The label of the widget.
   * @return widget label.
   */
  readonly label: string;
  /**
   * The info for the widget.
   * @return widget info.
   */
  readonly info: string;
  /**
   * Readonly status
   */
  readonly readonly: boolean;
  /**
   * The data type of the widget.
   * @return widget type, never null.
   */
  readonly type: WidgetTypes;
  /**
   * Lists choices for given widget. Only applicable to {@link WidgetTypes#RADIO} and {@link WidgetTypes#MENU} types.
   * @return list of possible choices captions.
   */
  readonly choices: string[] | undefined;

  /**
   * Returns allowed range for {@link WidgetTypes#RANGE} options.
   * @return the range.
   */
  readonly range: WidgetRange | undefined;

  constructor(readonly path: string, pointer: PointerCameraWidget, private cameraWidgets: any) {
    super({
      method: "gp_widget",
      pointer
    });

    this.label = this.loadProp("label", "string");
    this.type = this.loadProp("type", "number");
    this.info = this.loadProp("info", "string");
    this.readonly = this.loadProp("readonly", "boolean");
    this.choices = this.getChoices();
    this.range = this.getRanges();
  }

  /**
   * Returns the value of the configuration option.
   * @returns the value.
   */
  get value(): any {
    this.cameraWidgets.checkNotClosed();

    const type = this.type;

    switch (type) {
      case WidgetTypes.TEXT:
      case WidgetTypes.RADIO:
      case WidgetTypes.MENU: {
        const pref = GPPointerRef<any>();
        this.call("get_value", pref);
        const p = pref.deref();

        return p == null ? null : pointerToString(p);
      }

      case WidgetTypes.RANGE: {
        const pref = GPPointerFloat();
        this.call("get_value", pref);
        return pref.deref();
      }

      case WidgetTypes.TOGGLE: {
        const pref = GPPointerInt();
        this.call("get_value", pref);
        return pref.deref() === 2 ? null : pref.deref() === 1;
      }

      case WidgetTypes.DATE: {
        const pref = GPPointerInt();
        this.call("get_value", pref);
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
    try {
      if (this.readonly) {
        $log.warn(`Change cannot be applied on ${this.path}, because the path is in readonly mode`);
      } else {
        this.setValue(value, true);
      }
    } catch (er) {
      $log.warn(`Unable to change ${this.path} value. Given value: ${value}`, er);
    }
  }

  get changed(): boolean {
    this.cameraWidgets.checkNotClosed();
    return this.call("changed") === 1;
  }

  set changed(changed: boolean) {
    this.cameraWidgets.checkNotClosed();
    this.call("set_changed", changed ? 1 : 0);
  }

  updatePointer(pointer: PointerCameraWidget) {
    this._pointer = pointer;
  }

  /**
   * Change value. Set refresh to false if you don't want to refresh CameraWidget.
   * @param value
   * @param refresh
   */
  setValue(value: any, refresh = true) {
    this.cameraWidgets.checkNotClosed();

    if (this.readonly) {
      throw new Error(`Parameter name: invalid value ${this.path} [read-only]`);
    }

    const type = this.type;

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
        throw new Error(`Parameter type: invalid value ${type}: unsupported`);
    }

    this.call("set_value", ptr);

    if (refresh) {
      try {
        this.apply();
      } catch (er) {
        throw new Error(`Parameter value: failed to apply value ${value} on ${this.path}. \nError: ` + er.message);
      }
    }
  }

  checkType(...types: WidgetTypes[]): void {
    const type = this.type;
    if (types.indexOf(type) === -1) {
      throw new Error(`Parameter name: invalid value ${type}: expected ${types.join(",")} but got ${type}`);
    }
  }

  typeOf(type: WidgetTypes): boolean {
    return type === this.type;
  }

  /**
   * If the settings are altered, they need to be applied to take effect.
   */
  apply() {
    this.cameraWidgets.apply();
  }

  toJSON(): WidgetProps {
    return {
      path: this.path,
      label: this.label,
      type: this.type.toJSON(),
      readonly: this.readonly,
      info: this.info,
      value: this.value,
      choices: this.choices,
      range: this.range
    } as any;
  }

  private loadProp(key: string, type: "string" | "number" | "boolean") {
    let ref: Pointer<any>;
    switch (type) {
      case "string":
        ref = GPPointerString();
        break;
      case "boolean":
      case "number":
        ref = GPPointerInt();
        break;
    }

    this.call(`get_${key}`, ref);

    let value: any;

    switch (type) {
      case "string":
        value = ref.deref();
        break;
      case "number":
        value = WidgetTypes.fromCVal(ref.deref() as any);
        break;
      case "boolean":
        value = ref.deref() === 1;
        break;
    }

    return value as any;
  }

  private getChoices() {
    const type = this.type;

    if (!type.hasChoices) {
      return;
    }

    const choiceCount: number = this.call("count_choices");
    const result: string[] = [];

    for (let i = 0; i < choiceCount; i++) {
      const ref = GPPointerString();
      this.call("get_choice", i, ref);

      result.push(ref.deref());
    }

    return result;
  }

  private getRanges() {
    if (this.typeOf(WidgetTypes.RANGE)) {
      const min = GPPointerFloat();
      const max = GPPointerFloat();
      const step = GPPointerFloat();
      this.call("get_range", min, max, step);

      return new WidgetRange({min: min.deref(), max: max.deref(), step: step.deref()});
    }
  }
}
