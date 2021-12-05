import {Context, Middleware} from "@tsed/common";
import {HeaderParams} from "@tsed/platform-params";

@Middleware()
export class BaseUrlMiddleware {
  use(@HeaderParams("x-forwarded-proto") protocol: string, @HeaderParams("host") host: string, @Context() $ctx: Context) {
    $ctx.response.locals.BASE_URL = `${protocol || "http"}://${host}`;
  }
}
