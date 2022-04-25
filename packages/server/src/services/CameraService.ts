import {Inject, Injectable} from "@tsed/di";
import {LiveView} from "@tsed/gphoto2-driver";
import {CameraClient} from "../infra/camera/CameraClient";
import {CaptureOptionsModel} from "../domain/CaptureOptionsModel";

export interface LiveViewInstance {
  instance: LiveView;
  data: {chunk: Buffer | null; size: number};
}

@Injectable()
export class CameraService {
  @Inject()
  protected cameraClient: CameraClient;

  private liveViews: Map<number, LiveViewInstance> = new Map();

  getLiveView(id: number) {
    const camera = this.cameraClient.get(id);

    if (camera) {
      if (!this.liveViews.has(id)) {
        const liveView = new LiveView(camera, {
          fps: 24,
          output: "binary"
        });

        const item: LiveViewInstance = {instance: liveView, data: {chunk: null, size: 0}};

        liveView.on("data", (chunk: any, size: number) => {
          item.data.chunk = chunk;
          item.data.size = size;
        });

        liveView.on("end", () => {
          this.liveViews.delete(id);
        });

        this.liveViews.set(id, item);
      }
    }

    return this.liveViews.get(id);
  }

  async captureImage(id: number, captureModel: CaptureOptionsModel) {
    const isActiveLiveView = this.getLiveView(id)?.instance.isActive();

    if (isActiveLiveView) {
      this.stop(id);
    }

    const buffer = await this.cameraClient.getCaptureImage(id, captureModel);

    if (isActiveLiveView) {
      this.start(id);
    }

    return buffer;
  }

  start(id: number) {
    this.getLiveView(id)?.instance.start();
  }

  stop(id: number) {
    this.getLiveView(id)?.instance.stop();
  }

  getData(id: number) {
    return this.getLiveView(id)?.data;
  }

  $onDestroy() {
    this.liveViews.forEach((liveview) => {
      liveview.instance.stop();
      liveview.instance.close();
    });
  }
}
