import {Controller} from "@tsed/di";
import {array, Get, Name, object, Returns, string} from "@tsed/schema";
import {Context, UseBefore} from "@tsed/common";
import {Camera} from "@tsed/gphoto2-driver";
import {CameraAbilitiesModel} from "../../domain/CameraAbilitiesModel";
import {CheckCameraMiddleware} from "../../infra/middlewares/CheckCameraMiddleware";

@Controller("/:id")
@Name("Information")
@UseBefore(CheckCameraMiddleware)
export class CameraInformationController {
  @Get("/abilities")
  @Returns(200, CameraAbilitiesModel)
  @Returns(404).Description("Camera not found")
  getAbilities(@Context("camera") camera: Camera) {
    return camera.getAbilitiesInformation();
  }

  @Get("/summary")
  @Returns(200).Schema(array().items(object({label: string(), value: string()})))
  getSummary(@Context("camera") camera: Camera) {
    return camera.getParsedSummary();
  }

  @Get("/about")
  @Returns(200, String)
  @Returns(404).Description("Camera not found")
  getAbout(@Context("camera") camera: Camera) {
    return camera.getAbout();
  }

  @Get("/manual")
  @Returns(200, String)
  @Returns(404).Description("Camera not found")
  getManual(@Context("camera") camera: Camera) {
    return camera.getManual();
  }
}
