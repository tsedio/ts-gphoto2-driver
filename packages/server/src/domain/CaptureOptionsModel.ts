import {Default, Example, Required} from "@tsed/schema";

export class CaptureOptionsModel {
  @Required()
  @Example("file.jpg")
  fileName: string;

  @Required()
  @Default(true)
  autofocus: boolean = true;

  @Required()
  @Default(false)
  flash: boolean = false;

  @Required()
  @Default(false)
  triggerCapture: boolean = false;

  preview = false;
}
