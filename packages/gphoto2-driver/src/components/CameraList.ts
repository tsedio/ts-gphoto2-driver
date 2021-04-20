import {checkCode, GPhoto2Driver, GPPointerString} from "@tsed/gphoto2-core";
import {deref} from "ref-napi";
import {CameraOptions} from "../interfaces";
import {AbilitiesList} from "./AbilitiesList";
import {Camera} from "./Camera";
import {Context} from "./Context";
import {List} from "./List";
import {PortInfoList} from "./PortInfoList";

export class CameraList extends List<CameraOptions> {
  static readonly USB_PATTERN = /usb:\d+,\d+/;

  constructor() {
    super();
  }

  autodetect() {
    GPhoto2Driver.gp_camera_autodetect(this.pointer, Context.get().pointer);
  }

  /**
   *
   */
  load(): this {
    const portInfoList = new PortInfoList().load();
    const abilitiesList = new AbilitiesList().load();
    const cameraList = abilitiesList.detect(portInfoList);
    const count = cameraList.size;

    for (let i = 0; i < count; i++) {
      const model = GPPointerString(); // alloc("string") as PointerOf<string>;
      const path = GPPointerString(); // alloc("string") as PointerOf<string>;

      checkCode(GPhoto2Driver.gp_list_get_name(cameraList.pointer, i, model));
      checkCode(GPhoto2Driver.gp_list_get_value(cameraList.pointer, i, path));

      if (deref(path).match(CameraList.USB_PATTERN)) {
        this.push(deref(model), deref(path));
      }
    }

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
    const cameraInfo = this.get(index);

    if (cameraInfo) {
      const portInfoList = new PortInfoList().load();
      const camera = new Camera();
      const portInfo = portInfoList.findByPath(cameraInfo.port)!;

      camera.initialize(portInfo);

      portInfoList.close();

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
}
