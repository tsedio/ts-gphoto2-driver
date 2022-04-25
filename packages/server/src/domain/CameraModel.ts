import {CameraProps} from "@tsed/gphoto2-driver";
import {Property} from "@tsed/schema";

export class CameraModel implements CameraProps {
  @Property()
  id: string;

  @Property()
  model: string;

  @Property()
  port: string;
}
