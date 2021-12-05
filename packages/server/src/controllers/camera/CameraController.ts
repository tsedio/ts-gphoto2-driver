import {Controller, Inject} from "@tsed/di";
import {CameraClient} from "../../infra/camera/CameraClient";
import {Get, Name, Post, Returns} from "@tsed/schema";
import {CameraModel} from "../../domain/CameraModel";
import {BodyParams, Context, PathParams, UseBefore} from "@tsed/common";
import {CaptureOptionsModel} from "../../domain/CaptureOptionsModel";
import {CameraWidgetsController} from "./CameraWidgetsController";
import {CheckCameraMiddleware} from "../../infra/middlewares/CheckCameraMiddleware";
import {CameraInformationController} from "./CameraInformationController";
import {LiveViewController} from "./LiveViewController";
import {NO_CACHE} from "../../constants/NoCache";
import {CameraService} from "../../services/CameraService";

@Controller({path: "/cameras", children: [CameraInformationController, CameraWidgetsController, LiveViewController]})
@Name("Camera")
export class CameraController {
  @Inject()
  protected cameraClient: CameraClient;

  @Inject()
  protected cameraService: CameraService;

  @Get("/")
  @Returns(200, Array).Of(CameraModel).Header("Cache-Control", NO_CACHE)
  async getList() {
    return this.cameraClient.getAll();
  }

  @Get("/:id")
  @Returns(200, CameraModel)
  @Returns(404).Description("Camera not found")
  @UseBefore(CheckCameraMiddleware)
  getInfo(@PathParams("id") id: number) {
    return this.cameraClient.getInfo(id);
  }

  @Post("/:id/capture")
  @Returns(404).Description("Camera not found")
  @UseBefore(CheckCameraMiddleware)
  async getCapture(@PathParams("id") id: number, @BodyParams() captureModel: CaptureOptionsModel, @Context() $ctx: Context) {
    const buffer = await this.cameraService.captureImage(id, captureModel);

    if (buffer) {
      $ctx.response.attachment(captureModel.fileName);
    }

    return buffer;
  }

  @Post("/:id/preview")
  @Returns(404).Description("Camera not found")
  @UseBefore(CheckCameraMiddleware)
  async getPreview(@PathParams("id") id: number, @BodyParams() captureModel: CaptureOptionsModel, @Context() $ctx: Context) {
    captureModel.preview = true;
    return this.getCapture(id, captureModel, $ctx);
  }
}
