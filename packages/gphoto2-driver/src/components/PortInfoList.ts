import {checkCode, GPhoto2Driver, PointerPortInfoList, RefPortInfoList} from "@tsed/gphoto2-core";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class PortInfoList extends PointerWrapper<PointerPortInfoList> {
  private map: Map<string, PortInfo> = new Map();

  constructor() {
    super({method: "gp_port_info_list", refType: RefPortInfoList});
  }

  get size(): number {
    return checkCode(GPhoto2Driver.gp_port_info_list_count(this.pointer), "gp_port_info_list_count");
  }

  /**
   *
   */
  load(): this {
    checkCode(GPhoto2Driver.gp_port_info_list_load(this.pointer), "gp_port_info_list_load");

    this.toArray().forEach((portInfo) => {
      this.map.set(portInfo.path, portInfo);
    });

    return this;
  }

  /**
   *
   * @param {number} index
   * @returns {PortInfo}
   */
  getPortInfo(index: number): PortInfo {
    const portInfo = new PortInfo();
    checkCode(GPhoto2Driver.gp_port_info_list_get_info(this.pointer, index, portInfo.buffer), "gp_port_info_list_get_info");

    return portInfo;
  }

  /**
   *
   * @param {string} path
   * @returns {PortInfo}
   */
  findByPath(path: string): PortInfo | undefined {
    return this.map.get(path);
  }

  /**
   *
   * @returns {ICamera}
   */
  public toArray(): PortInfo[] {
    const list = [];
    const size = this.size;
    for (let i = 0; i < size; i++) {
      list.push(this.getPortInfo(i));
    }

    return list as any[];
  }
}
