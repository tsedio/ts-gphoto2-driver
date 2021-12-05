import {Constant, Controller, Inject} from "@tsed/di";
import {Get, Name, Post, Returns} from "@tsed/schema";
import {Context, PathParams, UseBefore} from "@tsed/common";
import fs from "fs";
import {CheckCameraMiddleware} from "../../infra/middlewares/CheckCameraMiddleware";
import {CameraService} from "../../services/CameraService";
import path from "path";

@Controller("/:id/live-view")
@Name("LiveView")
@UseBefore(CheckCameraMiddleware)
export class LiveViewController {
  @Constant("rootDir")
  protected rootDir: string;

  @Inject()
  protected liveViewService: CameraService;

  @Get("/stream")
  @Returns(404).Description("Camera not found")
  @Returns(200).Header("Cache-Control", "no-cache, no-store, private, max-age=0")
  async stream(@PathParams("id") id: number, @Context() $ctx: Context) {
    const liveView = this.liveViewService.getLiveView(id);

    if (!liveView) {
      return liveView;
    }

    const data = this.liveViewService.getData(id);

    if (data && data.chunk) {
      $ctx.response.setHeader("Content-Length", data.size);
      $ctx.response.setHeader("Content-Type", "image/jpeg");

      return data.chunk;
    }

    $ctx.response.setHeader("Content-Type", "image/png");
    return fs.createReadStream(path.join(this.rootDir, "../public/assets/camera.png"));
  }

  @Post("/:action")
  @Returns(204)
  action(@PathParams("id") id: number, @PathParams("action") action: string) {
    switch (action) {
      case "start":
        this.liveViewService.start(id);
        break;
      case "stop":
        this.liveViewService.stop(id);
        break;
    }
  }
}
