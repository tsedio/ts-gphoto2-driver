import {
  checkCode,
  GPhoto2Driver,
  GPPointer,
  GPPointerFloat,
  GPPointerInt,
  GPPointerRef,
  GPPointerString,
  PointerToString
} from "../driver";
import {PointerCameraWidget} from "../driver/modules";
import {PointerOf} from "../driver/types";
import {ICloseable} from "../interfaces";
import {Camera} from "./Camera";
import {CameraWidgetRange} from "./CameraWidgetRange";
import {Context} from "./Context";
import {WidgetTypes} from "./WidgetTypes";

export class CameraWidgets implements ICloseable {
  rootWidget: PointerCameraWidget;
  widgets: Map<string, PointerCameraWidget> = new Map();

  constructor(private camera: Camera) {

    const buffer = GPPointerRef<PointerCameraWidget>();
    checkCode(GPhoto2Driver.gp_widget_new(WidgetTypes.Window.cval, "", buffer));
    checkCode(GPhoto2Driver.gp_camera_get_config(camera.pointer, buffer, Context.get().pointer));

    this.rootWidget = buffer.deref();

    try {
      this.enumWidgets(this.rootWidget, "");
    } catch (er) {
      this.close();
      throw er;
    }
  }

  private checkNotClosed() {
    if (this.rootWidget == null) {
      throw new Error("Invalid state: closed");
    }
    if (this.camera.isClosed()) {
      throw new Error("Invalid state: camera is closed");
    }
  }

  private enumWidgets(widget: PointerCameraWidget, name: string) {
    this.checkNotClosed();
    const type = GPPointer<number>("int");

    checkCode(GPhoto2Driver.gp_widget_get_type(widget, type));


    const widgetType = WidgetTypes.fromCVal(type.deref());

    if (widgetType.hasValue) {
      this.widgets.set(name, widget);
    }

    const childcount: number = checkCode(GPhoto2Driver.gp_widget_count_children(widget));


    for (let i = 0; i < childcount; i++) {
      const buffer = GPPointerRef<PointerCameraWidget>();
      checkCode(GPhoto2Driver.gp_widget_get_child(widget, i, buffer));

      this.enumWidgets(buffer.deref(), name + "/" + this.getBasename(buffer.deref()));
    }
  }

  /**
   *
   * @returns {string[]}
   */
  public getNames(): string[] {
    this.checkNotClosed();
    return Array.from(this.widgets.keys()).sort();
  }

  /**
   *
   * @param {PointerCameraWidget} widget
   * @returns {string}
   */
  private getBasename(widget: PointerCameraWidget): string {
    this.checkNotClosed();

    const ref = GPPointerRef<string>("string");
    checkCode(GPhoto2Driver.gp_widget_get_name(widget, ref));

    return PointerToString(ref.deref());
  }

  /**
   * Returns the label of the widget.
   * @param name the widget name
   * @return widget label.
   */
  public getLabel(name: string): string {
    this.checkNotClosed();
    const ref = GPPointerRef<string>("string");

    checkCode(GPhoto2Driver.gp_widget_get_label(this.get(name), ref));

    return PointerToString(ref.deref());
  }

  /**
   * Returns the info for the widget.
   * @param name the widget name
   * @return widget info.
   */
  public getInfo(name: string): string {
    this.checkNotClosed();
    const ref = GPPointerRef<string>("string");

    checkCode(GPhoto2Driver.gp_widget_get_info(this.get(name), ref));

    return PointerToString(ref.deref());
  }

  /**
   * Returns the data type of the widget.
   * @param name the widget name
   * @return widget type, never null.
   */
  public getType(name: string): WidgetTypes {
    this.checkNotClosed();
    const ref = GPPointer<number>("int");

    checkCode(GPhoto2Driver.gp_widget_get_type(this.get(name), ref));

    return WidgetTypes.fromCVal(ref.deref());
  }

  /**
   * Returns the value of the configuration option.
   * @param {string} name the widget name
   * @returns the value.
   */
  public getValue(name: string): any {
    this.checkNotClosed();

    const type = this.getType(name);

    switch (type) {
      case WidgetTypes.Text:
      case WidgetTypes.Radio:
      case WidgetTypes.Menu: {

        const pref = GPPointerRef<void>();
        checkCode(GPhoto2Driver.gp_widget_get_value(this.get(name), pref));
        const p = pref.deref();

        return p == null ? null : PointerToString(p as PointerOf<string>);
      }

      case WidgetTypes.Range: {
        const pref = GPPointer<number>("float");
        checkCode(GPhoto2Driver.gp_widget_get_value(this.get(name), pref));
        return pref.deref();
      }

      case WidgetTypes.Toggle: {
        const pref = GPPointer<number>("int");
        checkCode(GPhoto2Driver.gp_widget_get_value(this.get(name), pref));
        return pref.deref() == 2 ? null : pref.deref() == 1;
      }

      case WidgetTypes.Date: {
        const pref = GPPointer<number>("int");
        checkCode(GPhoto2Driver.gp_widget_get_value(this.get(name), pref));
        return new Date(pref.deref() * 1000);
      }

      case WidgetTypes.Button:
        return null;

      default:
        throw new Error("Parameter name: invalid value " + name + ": unsupported type: " + type);
    }
  }

  /**
   * Sets the value of given property. The value must be of correct class.
   * <p></p>
   * Important: after the changes are made, the {@link #apply()} method must be called, to apply the new values.
   * @param name the property name, not null
   * @param value the value, may be null.
   */
  public setValue(name: string, value: any): void {
    this.checkNotClosed();
    if (this.isReadOnly(name)) {
      throw new Error("Parameter name: invalid value " + name + ": read-only");
    }
    const type = this.getType(name);
    if (!type.acceptsValue(value)) {
      throw new Error("Parameter value: invalid value " + value + ": expected " + type.valueType + " but got " + (value == null ? "null" : value.getClass()));
    }
    let ptr;
    switch (type) {
      case WidgetTypes.Text:
      case WidgetTypes.Radio:
      case WidgetTypes.Menu:
        if (value == null) {
          ptr = null;
        } else {
          ptr = GPPointerString(value);
        }
        break;

      case WidgetTypes.Range:
        ptr = GPPointerFloat(value);
        break;

      case WidgetTypes.Toggle:
        const val = value == null ? 2 : !!value ? 1 : 0;
        ptr = GPPointerInt(val);
        break;

      case WidgetTypes.Date:
        ptr = GPPointerInt(Math.ceil(new Date(value).getTime() / 1000));
        break;

      case WidgetTypes.Button:
        this.setChanged(name, true);
        return;
      default:
        throw new Error("Parameter type: invalid value " + type + ": unsupported");
    }

    checkCode(GPhoto2Driver.gp_widget_set_value(this.get(name), ptr));
  }

  private checkType(name: string, ...types: WidgetTypes[]): void {
    const type = this.getType(name);
    if (types.indexOf(type) === -1) {
      throw new Error("Parameter name: invalid value " + name + ": expected " + types.join(",") + " but got " + type);
    }
  }

  /**
   * Returns allowed range for {@link WidgetTypes#Range} options.
   * @param name the widget name.
   * @return the range.
   */
  public getRange(name: string): CameraWidgetRange {
    this.checkType(name, WidgetTypes.Range);
    return new CameraWidgetRange(this.get(name));
  }

  /**
   *
   * @param {string} name
   * @param {boolean} changed
   */
  public setChanged(name: string, changed: boolean): void {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_widget_set_changed(this.get(name), changed ? 1 : 0));
  }

  /**
   *
   * @param {string} name
   * @returns {boolean}
   */
  public isChanged(name: string): boolean {
    return checkCode(GPhoto2Driver.gp_widget_changed(this.get(name))) === 1;
  }

  /**
   *
   * @param {string} name
   * @returns {PointerCameraWidget}
   */
  private get(name: string): PointerCameraWidget {
    // requireNotNull(name, "name");
    this.checkNotClosed();
    const ptr = this.widgets.get(name);
    if (ptr == null) {
      throw new Error("Parameter name: invalid value " + name + ": the name is not known");
    }

    return ptr;
  }

  /**
   * Lists choices for given widget. Only applicable to {@link WidgetTypes#Radio} and {@link WidgetTypes#Menu} types.
   * @param name widget name.
   * @return list of possible choices captions.
   */
  public listChoices(name: string): string[] {
    const type = this.getType(name);
    if (!type.hasChoices) {
      throw new Error(`Parameter name: invalid value ${name}: is of type ${type} which does not have any choices.`);
    }
    const widget = this.get(name);
    const choiceCount: number = checkCode(GPhoto2Driver.gp_widget_count_choices(widget), "gp_widget_count_choices");
    const result: string[] = [];

    for (let i = 0; i < choiceCount; i++) {
      const ref = GPPointerRef<string>("string");
      checkCode(GPhoto2Driver.gp_widget_get_choice(widget, i, ref), "gp_widget_get_choice");

      result.push(PointerToString(ref.deref()));
    }
    return result;
  }

  public isReadOnly(name: string): boolean {
    this.checkNotClosed();
    const result = GPPointerInt();
    checkCode(GPhoto2Driver.gp_widget_get_readonly(this.get(name), result), "gp_widget_get_readonly");
    return result.deref() == 1;
  }

  public toString(): string {
    return "Widgets: " + this.getNames();
  }

  /**
   * Returns a debug description of all options, their types, descriptions, allowed values etc.
   * @return a formatted string of all options.
   */
  public inspect(): string {
    this.checkNotClosed();

    return this.getNames().map((name) => {
      const type = this.getType(name);
      const value = this.getValue(name);
      const info = this.getInfo(name);

      let row = `${name}: ${type} = ${type.valueType.getName()}: ${value}` + "\n"
        + `    ${this.getLabel(name)}`;


      if (info !== null && info.trim() !== "") {
        row += " - " + info;
      }

      if (type.hasChoices) {
        row += ": " + this.listChoices(name);
      }

      if (type === WidgetTypes.Range) {
        row += ": " + this.getRange(name);
      }

      if (this.isReadOnly(name)) {
        row += ": READ_ONLY";
      }
      return row + "\n";
    }).join("");
  }

  /**
   * If the settings are altered, they need to be applied to take effect.
   */
  public apply() {
    this.checkNotClosed();
    checkCode(GPhoto2Driver.gp_camera_set_config(this.camera.pointer, this.rootWidget, Context.get().pointer), "gp_camera_set_config");
  }

  close(): this {
    return this;
  }
}
