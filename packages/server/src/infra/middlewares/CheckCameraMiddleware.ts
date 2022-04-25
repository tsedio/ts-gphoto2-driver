import {Context, Middleware, PathParams} from "@tsed/common";
import {CameraClient} from "../camera/CameraClient";
import {Inject} from "@tsed/di";
import {NotFound} from "@tsed/exceptions";

@Middleware()
export class CheckCameraMiddleware {
  @Inject()
  protected cameraClient: CameraClient;

  use(@PathParams("id") id: number, @Context() $ctx: Context) {
    const camera = this.cameraClient.get(id);

    if (!camera) {
      throw new NotFound("Camera not found");
    }

    $ctx.set("camera", camera);
  }
}
