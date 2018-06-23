import {GPWidgetTypes} from "../driver/types";

export class WidgetTypes {
  /**
   * Window widget This is the toplevel configuration widget. It should likely contain multiple GP_WIDGET_SECTION entries.
   */
  static Window = new WidgetTypes(GPWidgetTypes.GP_WIDGET_WINDOW, false, false, false, null);
  /**
   * Section widget (think Tab).
   */
  static Section = new WidgetTypes(GPWidgetTypes.GP_WIDGET_SECTION, false, false, false, null);
  /**
   * Text widget.
   */
  static Text = new WidgetTypes(GPWidgetTypes.GP_WIDGET_TEXT, true, false, true, String);
  /**
   * Slider widget.
   */
  static Range = new WidgetTypes(GPWidgetTypes.GP_WIDGET_RANGE, true, false, false, Number);
  /**
   * Toggle widget (think check box).
   */
  static Toggle = new WidgetTypes(GPWidgetTypes.GP_WIDGET_TOGGLE, true, false, true, Boolean);
  /**
   * Radio button widget.
   */
  static Radio = new WidgetTypes(GPWidgetTypes.GP_WIDGET_RADIO, true, true, true, String);
  /**
   * Menu widget (same as {@link #Radio}).
   */
  static Menu = new WidgetTypes(GPWidgetTypes.GP_WIDGET_MENU, true, true, true, String);
  /**
   * Button press widget.
   */
  static Button = new WidgetTypes(GPWidgetTypes.GP_WIDGET_BUTTON, true, false, true, undefined);
  /**
   * Date entering widget.
   */
  static Date = new WidgetTypes(GPWidgetTypes.GP_WIDGET_DATE, true, false, false, Date);

  private static enums: WidgetTypes[] = [];

  constructor(private _cval: number,
              private _hasValue: boolean,
              private _hasChoices: boolean,
              private _acceptNullValue: boolean,
              private _valueType: any) {
    WidgetTypes.enums.push(this);
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

  get acceptNullValue(): boolean {
    return this._acceptNullValue;
  }

  get valueType(): any {
    return this._valueType;
  }

  static fromCVal(cval: number): WidgetTypes {
    const type: WidgetTypes | undefined = WidgetTypes.enums.find((item) => item._cval === cval);

    if (!type) {
      throw new Error("Parameter cval: invalid value " + cval + ": no such widget type");
    }

    return type;
  }

  public acceptsValue(value: any): boolean {
    if (!this.valueType) {
      return false;
    }
    if (!value) {
      return this.acceptNullValue;
    }
    return this.valueType.isInstance(value);
  }
}