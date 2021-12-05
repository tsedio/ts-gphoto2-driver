import {Controller, Inject} from "@tsed/di";
import {Get} from "@tsed/schema";
import {View} from "@tsed/platform-views";
import {CameraClient} from "../../infra/camera/CameraClient";
import {Context, PathParams, UseBefore} from "@tsed/common";
import {CheckCameraMiddleware} from "../../infra/middlewares/CheckCameraMiddleware";
import {Camera} from "@tsed/gphoto2-driver";

@Controller("/photo-booth")
export class PhotoBoothController {
  @Inject()
  protected cameraClient: CameraClient;

  @Get("/")
  @View("pages/photo-booth/home.ejs")
  async getCameraList() {
    return {
      cameras: await this.cameraClient.getAll()
    };
  }

  @Get("/:id")
  @View("pages/photo-booth/camera.ejs")
  @UseBefore(CheckCameraMiddleware)
  async getCamera(@PathParams("id") id: string, @Context("camera") camera: Camera) {
    const summary = camera.getParsedSummary().filter(({type}) => type !== "section");
    const batteryLevel = summary.find(({label}) => label === "Battery Level");

    return {
      cameraId: id,
      summary,
      batteryLevel
    };
  }
}
