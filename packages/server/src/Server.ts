import {Configuration, Inject} from "@tsed/di";
import {PlatformApplication} from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import {config, rootDir} from "./config";
import {IndexCtrl} from "./controllers/pages/IndexController";
import {CameraController} from "./controllers/camera/CameraController";
import {PhotoBoothController} from "./controllers/pages/PhotoBoothController";
import {BaseUrlMiddleware} from "./infra/middlewares/BaseUrlMiddleware";
import {MediasController} from "./controllers/media/MediasController";
import {NetworkController} from "./controllers/network/NetworkController";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8099,
  httpsPort: false, // CHANGE
  disableComponentsScan: true,
  mount: {
    "/rest": [CameraController, MediasController, NetworkController],
    "/": [IndexCtrl, PhotoBoothController]
  },
  swagger: [
    {
      path: "/docs",
      specVersion: "3.0.1"
    }
  ],
  views: {
    root: `${rootDir}/../views`,
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"],
  statics: {
    "/statics": {
      root: `${rootDir}/../public`
    }
  }
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(BaseUrlMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      );
  }
}
