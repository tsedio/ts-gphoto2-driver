import {WidgetTypes} from "../components/WidgetTypes";
import {PointerCameraWidget} from "../driver/modules";

export interface IWidget {
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
