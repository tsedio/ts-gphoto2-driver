import {Constant, Controller} from "@tsed/di";
import {Get, Returns} from "@tsed/schema";
import path from "path";
import globby from "globby";

@Controller("/medias")
export class MediasController {
  @Constant("rootDir")
  protected rootDir: string;

  @Get("/")
  @Returns(200, Array).Of(String)
  async getAll() {
    const cwd = path.join(this.rootDir, "..", "public", ".tmp");

    const files = await globby("*.jpg", {
      cwd,
      absolute: false
    });

    return files.map((file) => {
      return `/statics/.tmp/${file}`;
    });
  }
}
