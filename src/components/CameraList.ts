import {checkCode, GPhoto2Driver} from "..";
import {getListName, getListValue} from "../driver/GPPointerOf";
import {ICamera} from "../interfaces/ICamera";
import {AbilitiesList} from "./AbilitiesList";
import {List} from "./List";
import {PortInfo} from "./PortInfo";
import {PortInfoList} from "./PortInfoList";

export class CameraList extends List<ICamera> {
  static readonly USB_PATTERN = /usb:\d+,\d+/;

  constructor() {
    super();
    this.populateList();
  }

  /**
   *
   */
  private populateList(): void {
    const portInfoList = new PortInfoList();
    const abilitiesList = new AbilitiesList();
    const cameraList = abilitiesList.detect(portInfoList);

    const count = cameraList.size;

    for (let i = 0; i < count; i++) {
      const model = getListName(cameraList, i);
      const path = getListValue(cameraList, i);

      if (path.match(CameraList.USB_PATTERN)) {
        this.push(model, path);
      }
    }

    portInfoList.close();
    abilitiesList.close();
    cameraList.close();
  }

  public getPortInfo(index: number) {
    const portInfo = new PortInfo();
    checkCode(GPhoto2Driver.gp_port_info_list_get_info(this.pointer, index, portInfo.buffer));
    return portInfo;
  }

  /**
   *
   * @returns {string}
   */
  public toString(): string {
    const str = this.toArray()
      .map(item => `${item.model}:${item.port}`)
      .join(", ");

    return `CameraList[${str}]`;
  }

  /**
   *
   * @returns {ICamera}
   */
  public toArray() {
    return super.toArray().map((item: any) => {
      return {
        model: item.name,
        port: item.value
        //  portInfo:
      };
    });
  }
}
