import {checkCode, GPhoto2Driver, GPPointer, GPPointerRef, GPPointerString} from "../driver";
import {PointerCamera, PointerCameraWidget} from "../driver/modules";
import {nameOf} from "../driver/utils/ObjectUtils";
import {ICloseable, IWidget} from "../interfaces";
import {Context} from "./Context";
import {Widget} from "./Widget";
import {WidgetRange} from "./WidgetRange";
import {WidgetTypes} from "./WidgetTypes";

export class CameraWidgets extends Map<string, Widget> implements ICloseable {
  rootWidget: PointerCameraWidget;

  constructor(private camera: {pointer: PointerCamera; isClosed(): boolean}) {
    super();

    this.refresh();
  }

  public refresh() {
    const buffer = GPPointerRef<PointerCameraWidget>();
    checkCode(GPhoto2Driver.gp_widget_new(WidgetTypes.WINDOW.cval, "", buffer));
    checkCode(GPhoto2Driver.gp_camera_get_config(this.camera.pointer, buffer, Context.get().pointer));

    this.rootWidget = buffer.deref();

    try {
      this.enumWidgets(this.rootWidget, "");
    } catch (er) {
      this.close();
      throw er;
    }
  }

  /**
   * Enumerate all widgets
   * @param widget
   * @param path
   */
  private enumWidgets(widget: PointerCameraWidget, path: string) {
    this.checkNotClosed();
    const type = GPPointer<number>("int");

    checkCode(GPhoto2Driver.gp_widget_get_type(widget, type));

    const widgetType = WidgetTypes.fromCVal(type.deref());

    if (widgetType.hasValue) {
      if (super.has(path)) {
        super.get(path)!.pointer = widget;
      } else {
        super.set(path, new Widget(path, widget, this));
      }
    }

    const childcount: number = checkCode(GPhoto2Driver.gp_widget_count_children(widget));

    for (let i = 0; i < childcount; i++) {
      const buffer = GPPointerRef<PointerCameraWidget>();
      checkCode(GPhoto2Driver.gp_widget_get_child(widget, i, buffer));

      this.enumWidgets(buffer.deref(), `${path}/${this.getBasename(buffer.deref())}`);
    }
  }

  /**
   *
   * @param {PointerCameraWidget} widget
   * @returns {string}
   */
  private getBasename(widget: PointerCameraWidget): string {
    this.checkNotClosed();

    const ref = GPPointerString();
    checkCode(GPhoto2Driver.gp_widget_get_name(widget, ref));

    return ref.deref();
  }

  /**
   *
   */
  checkNotClosed() {
    if (this.rootWidget == null) {
      throw new Error("Invalid state: closed");
    }
    if (this.camera.isClosed()) {
      throw new Error("Invalid state: camera is closed");
    }
  }

  /**
   * @deprecated
   * @returns {string[]}
   */
  getNames(): string[] {
    return this.getPaths();
  }

  getPaths(): string[] {
    this.checkNotClosed();

    return Array.from(this.keys()).sort();
  }

  /**
   * If the settings are altered, they need to be applied to take effect.
   *
   * @param obj An object to define a group of configuration
   */
  apply(obj?: any) {
    this.checkNotClosed();

    if (obj) {
      Object.keys(obj).forEach(key => {
        this.get(key).applyValue(obj[key], false);
      });
    }

    checkCode(GPhoto2Driver.gp_camera_set_config(this.camera.pointer, this.rootWidget, Context.get().pointer), "gp_camera_set_config");

    this.refresh();
  }

  close(): this {
    return this;
  }

  [Symbol.iterator](): IterableIterator<[string, Widget]> {
    this.checkNotClosed();

    return super[Symbol.iterator]();
  }

  /**
   * Return a widget from his path.
   * @param {string} path
   * @returns {PointerCameraWidget}
   */
  get(path: string): Widget {
    this.checkNotClosed();

    const widget = super.get(path);

    if (!widget || widget.pointer == null) {
      throw new Error("Parameter path: invalid value " + path + ": the path is not known");
    }

    return widget;
  }

  /**
   *
   * @param key
   */
  has(key: string): boolean {
    this.checkNotClosed();

    return super.has(key);
  }

  /**
   *
   * @param key
   * @param value
   */
  set(key: string, value: IWidget): this {
    return this;
  }

  keys(): IterableIterator<string> {
    this.checkNotClosed();

    return super.keys();
  }

  entries(): IterableIterator<[string, Widget]> {
    this.checkNotClosed();

    return super.entries();
  }

  values(): IterableIterator<Widget> {
    this.checkNotClosed();

    return super.values();
  }

  clear(): void {}

  forEach(callbackfn: (value: Widget, key: string, map: Map<string, Widget>) => void, thisArg?: any): void {
    this.checkNotClosed();

    super.forEach(callbackfn, thisArg);
  }

  toJSON() {
    this.checkNotClosed();

    const obj: any = {};

    this.forEach((item, key) => {
      obj[key] = item.toJSON();
    });

    return obj;
  }

  /**
   *
   */
  toArray(): Widget[] {
    this.checkNotClosed();

    const list: Widget[] = [];

    this.forEach(item => list.push(item));

    return list;
  }

  /**
   * Returns a debug description of all options, their types, descriptions, allowed values etc.
   * @return a formatted string of all options.
   */
  inspect(): string {
    return this.toArray()
      .map(widget => {
        const {type, value, info, path, label} = widget;

        let row = `${path}: ${type} = ${nameOf(type.valueType)}: ${value}` + "\n" + `    ${label}`;

        if (info !== null && info.trim() !== "") {
          row += " - " + info;
        }

        if (type.hasChoices) {
          row += ": " + widget.choices;
        }

        if (type === WidgetTypes.RANGE) {
          row += ": " + widget.range;
        }

        if (widget.readonly) {
          row += ": READ_ONLY";
        }

        return row + "\n";
      })
      .join("");
  }

  toString(): string {
    return "CameraWidgets: " + this.getPaths().join(", ");
  }

  // DEPRECATED
  /**
   * Returns the label of the widget.
   * @param path the widget path
   * @return widget label.
   * @deprecated
   */
  getLabel(path: string): string {
    return this.get(path).label;
  }

  /**
   * Returns the info for the widget.
   * @param path the widget path
   * @return widget info.
   * @deprecated
   */
  getInfo(path: string): string {
    return this.get(path).info;
  }

  /**
   * Returns the data type of the widget.
   * @param path the widget path
   * @return widget type, never null.
   * @deprecated
   */
  getType(path: string): WidgetTypes {
    return this.get(path).type;
  }

  /**
   * Returns the value of the configuration option.
   * @param {string} path the widget path
   * @returns the value.
   * @deprecated
   */
  getValue(path: string): any {
    return this.get(path).value;
  }

  /**
   * Sets the value of given property. The value must be of correct class.
   * <p></p>
   * Important: after the changes are made, the {@link #apply()} method must be called, to apply the new values.
   * @param path the property path, not null
   * @param value the value, may be null.
   * @deprecated
   */
  setValue(path: string, value: any): void {
    this.get(path).value = value;
  }

  /**
   * Returns allowed range for {@link WidgetTypes#RANGE} options.
   * @param path the widget path.
   * @deprecated
   * @return the range.
   */
  getRange(path: string): WidgetRange | undefined {
    return this.get(path).range;
  }

  /**
   *
   * @param {string} path
   * @param {boolean} changed
   * @deprecated
   */
  setChanged(path: string, changed: boolean): void {
    this.get(path).changed = changed;
  }

  /**
   *
   * @param {string} path
   * @returns {boolean}
   * @deprecated
   */
  isChanged(path: string): boolean {
    return this.get(path).changed;
  }

  /**
   * Lists choices for given widget. Only applicable to {@link WidgetTypes#RADIO} and {@link WidgetTypes#MENU} types.
   * @param path widget path.
   * @return list of possible choices captions.
   * @deprecated
   */
  listChoices(path: string): string[] {
    const widget = this.get(path);

    if (!widget.type.hasChoices) {
      throw new Error(`Parameter path: invalid value ${path}: is of type ${widget.type} which does not have any choices.`);
    }

    return widget.choices!;
  }

  /**
   * @deprecated
   * @param path
   */
  isReadOnly(path: string): boolean {
    return this.get(path).readonly;
  }
}
