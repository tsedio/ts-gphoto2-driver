import {WidgetCommonProps, WidgetRange, WidgetRangeProps, WidgetSelectProps, WidgetTypesProps} from "@tsed/gphoto2-driver";
import {CollectionOf, Enum, Example, Property, ReadOnly} from "@tsed/schema";

export class WidgetCommonModel<T = any> implements WidgetCommonProps {
  @ReadOnly()
  @Example("/actions/bulb")
  readonly path: string;

  @ReadOnly()
  @Enum(WidgetTypesProps)
  readonly type: WidgetTypesProps.RANGE;

  @ReadOnly()
  readonly readonly: boolean;

  @Property()
  changed: boolean;

  @ReadOnly()
  readonly info: string;

  @ReadOnly()
  readonly label: string;

  @Property()
  value: T;

  @Property(String)
  @ReadOnly()
  @Example("actions--bulb")
  readonly id: string;
}

export class WidgetSelectModel<T = any> extends WidgetCommonModel<T> implements WidgetSelectProps {
  @ReadOnly()
  @CollectionOf(String)
  readonly choices: string[] | undefined;
}

Property(Number)(WidgetRange.prototype, "min");
Property(Number)(WidgetRange.prototype, "max");
Property(Number)(WidgetRange.prototype, "step");

export class WidgetRangeModel<T = any> extends WidgetCommonModel<T> implements WidgetRangeProps {
  @ReadOnly()
  readonly range: WidgetRange;
}
