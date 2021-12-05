import {Constant, Controller} from "@tsed/di";
import {View} from "@tsed/platform-views";
import {SwaggerSettings} from "@tsed/swagger";
import {Get, Hidden, Returns} from "@tsed/schema";
import {Locals} from "@tsed/common";

@Hidden()
@Controller("/")
export class IndexCtrl {
  @Constant("swagger")
  swagger: SwaggerSettings[];

  @Get("/")
  @View("pages/home.ejs")
  @Returns(200, String).ContentType("text/html")
  get(@Locals("BASE_URL") BASE_URL: string) {
    return {
      docs: this.swagger.map((conf) => {
        return {
          url: BASE_URL + conf.path,
          ...conf
        };
      })
    };
  }
}
