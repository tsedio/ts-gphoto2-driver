import {$log} from "@tsed/logger";
import {CameraProps} from "../interfaces";
import {AbilitiesList} from "./AbilitiesList";
import {Camera} from "./Camera";
import {Context} from "./Context";
import {List} from "./List";
import {PortInfoList} from "./PortInfoList";

export class CameraList extends List<CameraProps> {
  static readonly USB_PATTERN = /usb:\d+,\d+/;

  #cache = new Map<number, Camera>();

  constructor() {
    super();
  }

  static getCamera(index: number) {
    const cameraList = new CameraList().load();

    return cameraList.getCamera(index);
  }

  autodetect() {
    return this.run("gp_camera_autodetect", this.pointer, Context.get().pointer);
  }

  async autodetectAsync() {
    return this.runAsync("gp_camera_autodetect", this.pointer, Context.get().pointer);
  }

  load(): this {
    this.#cache = new Map<number, Camera>();
    const portInfoList = new PortInfoList().load();
    const abilitiesList = new AbilitiesList().load();
    const cameraList = abilitiesList.detect(portInfoList);

    $log.debug("Found", cameraList.size, "camera(s)");
    this.getCameraListInfos(cameraList);

    portInfoList.close();
    abilitiesList.close();
    cameraList.close();

    return this;
  }

  async loadAsync() {
    this.#cache = new Map<number, Camera>();

    const [portInfoList, abilitiesList] = await Promise.all([new PortInfoList().load(), new AbilitiesList().load()]);

    const cameraList = await abilitiesList.detectAsync(portInfoList);

    $log.debug("Found", cameraList.size, "camera(s)");
    this.getCameraListInfos(cameraList);

    portInfoList.close();
    abilitiesList.close();
    cameraList.close();

    return this;
  }

  /**
   *
   * @param {number} index
   * @returns {Camera | undefined}
   */
  getCamera(index: number): Camera | undefined {
    const cam = this.#cache.get(index);

    if (cam) {
      return cam;
    }

    const cameraInfo = this.get(index);

    if (cameraInfo) {
      const portInfoList = new PortInfoList().load();
      const camera = new Camera();
      const portInfo = portInfoList.findByPath(cameraInfo.port);

      camera.initialize(portInfo);

      portInfoList.close();

      this.#cache.set(index, camera);

      return camera;
    }

    return undefined;
  }

  /**
   *
   * @returns {string}
   */
  public toString(): string {
    const str = this.toArray()
      .map((item) => `${item.id}:${item.model}:${item.port}`)
      .join(", ");

    return `CameraList{${str}}`;
  }

  private getCameraListInfos(cameraList: List<any>) {
    const count = cameraList.size;

    for (let i = 0; i < count; i++) {
      const model = cameraList.getName(i);
      const path = cameraList.getValue(i);

      if (path.match(CameraList.USB_PATTERN)) {
        this.push(model, path);

        this.getCamera(i);
      }
    }
  }
}
