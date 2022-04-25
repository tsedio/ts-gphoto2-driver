import {GPWidgetType} from "@tsed/gphoto2-core";
import {nameOf} from "@tsed/core";

const enums: WidgetTypes[] = [];

export class WidgetTypes {
  /**
   * WINDOW widget This is the toplevel configuration widget. It should likely contain multiple GP_WIDGET_SECTION entries.
   */
  static WINDOW = new WidgetTypes(GPWidgetType.GP_WIDGET_WINDOW, false, false, false, null);
  /**
   * SECTION widget (think Tab).
   */
  static SECTION = new WidgetTypes(GPWidgetType.GP_WIDGET_SECTION, false, false, false, null);
  /**
   * TEXT widget.
   */
  static TEXT = new WidgetTypes(GPWidgetType.GP_WIDGET_TEXT, true, false, true, String);
  /**
   * Slider widget.
   */
  static RANGE = new WidgetTypes(GPWidgetType.GP_WIDGET_RANGE, true, false, false, Number);
  /**
   * Toggle widget (think check box).
   */
  static TOGGLE = new WidgetTypes(GPWidgetType.GP_WIDGET_TOGGLE, true, false, true, Boolean);
  /**
   * Radio button widget.
   */
  static RADIO = new WidgetTypes(GPWidgetType.GP_WIDGET_RADIO, true, true, true, String);
  /**
   * Menu widget (same as {@link #RADIO}).
   */
  static MENU = new WidgetTypes(GPWidgetType.GP_WIDGET_MENU, true, true, true, String);
  /**
   * Button press widget.
   */
  static BUTTON = new WidgetTypes(GPWidgetType.GP_WIDGET_BUTTON, true, false, true, undefined);
  /**
   * Date entering widget.
   */
  static DATE = new WidgetTypes(GPWidgetType.GP_WIDGET_DATE, true, false, false, Date);

  constructor(
    private _cval: number,
    private _hasValue: boolean,
    private _hasChoices: boolean,
    private _acceptNullValue: boolean,
    private _valueType: any
  ) {
    enums.push(this);
  }

  get label() {
    return GPWidgetType[this.cval];
  }

  get cval(): number {
    return this._cval;
  }

  get hasValue(): boolean {
    return this._hasValue;
  }

  get hasChoices(): boolean {
    return this._hasChoices;
  }

  get valueType(): any {
    return this._valueType;
  }

  static fromCVal(cval: number): WidgetTypes {
    const type: WidgetTypes | undefined = enums.find((item) => item._cval === cval);

    if (!type) {
      throw new Error("Parameter cval: invalid value " + cval + ": no such widget type");
    }

    return type;
  }

  toString() {
    return nameOf(this.label).replace("GP_WIDGET_", "");
  }

  toJSON() {
    return this.toString();
  }
}
