import type {WidgetRange} from "../components/WidgetRange";

export enum WidgetTypesProps {
  WINDOW = "WINDOW",
  SECTION = "SECTION",
  TEXT = "TEXT",
  RANGE = "RANGE",
  TOGGLE = "TOGGLE",
  RADIO = "RADIO",
  MENU = "MENU",
  BUTTON = "BUTTON",
  DATE = "DATE"
}

export interface WidgetCommonProps {
  readonly path: string;
  readonly type: WidgetTypesProps;
  readonly label: string;
  readonly info: string;
  readonly readonly: boolean;
  changed: boolean;
  value: any;
}

export interface WidgetRangeProps extends WidgetCommonProps {
  readonly type: WidgetTypesProps.RANGE;
  readonly range: WidgetRange;
}

export interface WidgetSelectProps extends WidgetCommonProps {
  readonly choices: string[] | undefined;
}

export type WidgetProps = WidgetCommonProps | WidgetRangeProps | WidgetSelectProps;
