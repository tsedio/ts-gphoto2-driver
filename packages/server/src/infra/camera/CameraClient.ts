import {Constant, Injectable} from "@tsed/di";
import {CameraList} from "@tsed/gphoto2-driver";
import {deserialize} from "@tsed/json-mapper";
import {createReadStream} from "fs";
import {CameraModel} from "../../domain/CameraModel";
import path from "path";
import {CaptureOptionsModel} from "../../domain/CaptureOptionsModel";

@Injectable()
export class CameraClient extends Map {
  @Constant("rootDir")
  protected rootDir: string;

  private cameraList: CameraList;

  async $onInit() {
    this.cameraList = await new CameraList().loadAsync();
  }

  get(index: number) {
    return this.cameraList.getCamera(index);
  }

  getInfo(index: number) {
    return this.cameraList.get(index);
  }

  getAll(): CameraModel {
    return deserialize(this.cameraList.toArray(), {type: CameraModel});
  }

  async getCaptureImage(id: number, options: CaptureOptionsModel) {
    const camera = this.get(id);

    if (camera) {
      const file = path.join(this.rootDir, "..", "public", ".tmp", options.fileName);

      if (options.autofocus) {
        camera.autoFocus();
      }

      if (options.flash) {
        camera.openFlash();
      }

      if (options.triggerCapture) {
        await camera.triggerCaptureAsync();
      }

      if (!options.preview) {
        await camera.captureImageAsync(file);
      } else {
        await camera.capturePreview(file);
      }

      return createReadStream(file);
    }
  }

  $onDestroy() {
    this.cameraList.closeQuietly();
  }
}
