/**
 * \brief Type of the widget to be created.
 *
 * The actual widget type we want to create. The type of the value
 * it supports depends on this type.
 */
export enum GPWidgetType {
  GP_WIDGET_WINDOW = 0, // # WINDOW widget This is the toplevel configuration widget. It should likely contain multiple GP_WIDGET_SECTION entries.
  GP_WIDGET_SECTION = 1, // # SECTION widget (think Tab).
  GP_WIDGET_TEXT = 2, // # TEXT widget.
  GP_WIDGET_RANGE = 3, // # Slider widget.
  GP_WIDGET_TOGGLE = 4, // # Toggle widget (think check box).
  GP_WIDGET_RADIO = 5, // # Radio button widget.
  GP_WIDGET_MENU = 6, // # Menu widget (same as RADIO).
  GP_WIDGET_BUTTON = 7, // # Button press widget.
  GP_WIDGET_DATE = 8 // # Date entering widget.
}
