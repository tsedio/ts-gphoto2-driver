import {Controller} from "@tsed/di";
import {BodyParams, Context, PathParams, Put, UseBefore} from "@tsed/common";
import {Camera, WidgetCommonProps} from "@tsed/gphoto2-driver";
import {Any, Get, Name, Returns} from "@tsed/schema";
import {CheckCameraMiddleware} from "../../infra/middlewares/CheckCameraMiddleware";
import {WidgetCommonModel, WidgetRangeModel, WidgetSelectModel} from "../../domain/WidgetModel";
import {NotFound} from "@tsed/exceptions";

function getId(item: WidgetCommonProps) {
  return item.path.replace(/^\//, "").replace(/\//gi, "--");
}

function getPath(id: string) {
  return `/${id.replace(/--/gi, "/")}`;
}

@Controller("/:id/widgets")
@Name("Settings")
@UseBefore(CheckCameraMiddleware)
export class CameraWidgetsController {
  @Get("/")
  @Returns(200, Array).AnyOf(WidgetCommonModel, WidgetSelectModel, WidgetRangeModel)
  getAll(@Context("camera") camera: Camera) {
    return camera.widgets.toArray().map((widget) => {
      const item = widget.toJSON();
      return {
        id: getId(item),
        ...item
      };
    });
  }

  @Get("/:widgetId")
  @Returns(200).AnyOf(WidgetCommonModel, WidgetSelectModel, WidgetRangeModel)
  @Returns(404).Description("Widget not found")
  get(@PathParams("widgetId") id: string, @Context("camera") camera: Camera) {
    const widget = camera.widgets.get(getPath(id));

    if (!widget) {
      throw new NotFound("Widget not found");
    }

    const item = widget.toJSON();

    return {
      id: getId(item),
      ...widget.toJSON()
    };
  }

  @Put("/:widgetId/value")
  @Returns(200).AnyOf(WidgetCommonModel, WidgetSelectModel, WidgetRangeModel)
  @Returns(404).Description("Widget not found")
  setValue(@PathParams("widgetId") id: string, @BodyParams("value") @Any() value: any, @Context("camera") camera: Camera) {
    const path = getPath(id);

    if (!camera.widgets.get(path)) {
      throw new NotFound("Widget not found");
    }

    camera.setWidgetValue(path, value);

    return this.get(id, camera);
  }

  @Get("/inspect")
  @Returns(200, String)
  inspect(@Context("camera") camera: Camera) {
    return camera.widgets.inspect();
  }
}
