import {PointerCameraWidget} from "@tsed/gphoto2-core";
import {WidgetTypes} from "../components/WidgetTypes";

export interface WidgetProps {
  pointer: PointerCameraWidget;
  readonly path: any;
  readonly type: WidgetTypes;
  readonly label: string;
  readonly info: string;
  readonly choices: string[] | undefined;
  readonly readonly: boolean;
  readonly changed: boolean;
  value: any;
  readonly range?: {
    min: number;
    max: number;
    step: number;
  };

  toJSON(): any;
}
