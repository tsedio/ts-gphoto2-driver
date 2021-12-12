import {nameOf} from "@tsed/core";
import {Closeable, GPPointer, GPPointerRef, GPPointerString, PointerCamera, PointerCameraWidget, runMethod} from "@tsed/gphoto2-core";
import {WidgetProps} from "../interfaces/WidgetProps";
import {Context} from "./Context";
import {Widget} from "./Widget";
import {WidgetTypes} from "./WidgetTypes";

export class CameraWidgets extends Map<string, Widget> implements Closeable {
  rootWidget: PointerCameraWidget;

  constructor(private camera: {pointer: PointerCamera; isClosed(): boolean}) {
    super();

    this.refresh();
  }

  public refresh() {
    const buffer = GPPointerRef<PointerCameraWidget>();

    runMethod("gp_widget_new", WidgetTypes.WINDOW.cval, "", buffer);
    runMethod("gp_camera_get_config", this.camera.pointer, buffer, Context.get().pointer);

    this.rootWidget = buffer.deref();

    try {
      this.enumWidgets(this.rootWidget, "");
    } catch (er) {
      this.close();
      throw er;
    }
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

  getPaths(): string[] {
    this.checkNotClosed();

    return Array.from(this.keys()).sort();
  }

  getInformation() {
    return this.getPaths().reduce((props, key) => {
      return {
        ...props,
        [key]: this.get(key).value
      };
    }, {});
  }

  /**
   * If the settings are altered, they need to be applied to take effect.
   *
   * @param obj An object to define a group of configuration
   */
  apply(obj?: any) {
    this.checkNotClosed();

    if (obj) {
      Object.keys(obj).forEach((key) => {
        this.get(key).setValue(obj[key], false);
      });
    }

    runMethod("gp_camera_set_config", this.camera.pointer, this.rootWidget, Context.get().pointer);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(key: string, value: Widget): this {
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

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  clear(): void {}

  forEach(callbackfn: (value: Widget, key: string, map: Map<string, Widget>) => void, thisArg?: any): void {
    this.checkNotClosed();

    super.forEach(callbackfn, thisArg);
  }

  toJSON(): Record<string, WidgetProps> {
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

    this.forEach((item) => list.push(item));

    return list;
  }

  /**
   * Returns a debug description of all options, their types, descriptions, allowed values etc.
   * @return a formatted string of all options.
   */
  inspect(): string {
    return this.toArray()
      .map((widget) => {
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

  /**
   * Enumerate all widgets
   * @param pWidget
   * @param path
   */
  private enumWidgets(pWidget: PointerCameraWidget, path: string) {
    this.checkNotClosed();
    const type = GPPointer<number>("int");

    runMethod("gp_widget_get_type", pWidget, type);

    const widgetType = WidgetTypes.fromCVal(type.deref());

    if (widgetType.hasValue) {
      const widget = super.get(path);
      if (widget) {
        widget.updatePointer(pWidget);
      } else {
        super.set(path, new Widget(path, pWidget, this));
      }
    }

    const childcount: number = runMethod("gp_widget_count_children", pWidget);

    for (let i = 0; i < childcount; i++) {
      const buffer = this.getChild(pWidget, i);

      this.enumWidgets(buffer.deref(), `${path}/${this.getBasename(buffer.deref())}`);
    }
  }

  private getChild(pWidget: Buffer & {deref(): void}, i: number) {
    const buffer = GPPointerRef<PointerCameraWidget>();
    runMethod("gp_widget_get_child", pWidget, i, buffer);
    return buffer;
  }

  /**
   *
   * @param {PointerCameraWidget} widget
   * @returns {string}
   */
  private getBasename(widget: PointerCameraWidget): string {
    this.checkNotClosed();

    const ref = GPPointerString();
    runMethod("gp_widget_get_name", widget, ref);

    return ref.deref();
  }
}
