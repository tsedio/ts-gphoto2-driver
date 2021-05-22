import {checkCode, getGPhoto2Driver, PointerPortInfoList, RefPortInfoList} from "@tsed/gphoto2-core";
import {$log} from "@tsed/logger";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class PortInfoList extends PointerWrapper<PointerPortInfoList> {
  private map: Map<string, PortInfo> = new Map();

  constructor() {
    super({method: "gp_port_info_list", refType: RefPortInfoList});
  }

  get size(): number {
    return checkCode(getGPhoto2Driver().gp_port_info_list_count(this.pointer), "gp_port_info_list_count");
  }

  /**
   *
   */
  load(): this {
    $log.debug("Load port info list...");

    checkCode(getGPhoto2Driver().gp_port_info_list_load(this.pointer), "gp_port_info_list_load");

    this.toArray().forEach((portInfo) => {
      this.map.set(portInfo.path, portInfo);
    });

    $log.debug("Load port info list... ok");

    return this;
  }

  /**
   *
   * @param {number} index
   * @returns {PortInfo}
   */
  getPortInfo(index: number): PortInfo {
    $log.debug("Get port info...");
    const portInfo = new PortInfo();
    checkCode(getGPhoto2Driver().gp_port_info_list_get_info(this.pointer, index, portInfo.buffer), "gp_port_info_list_get_info");
    $log.debug("Get port info... ok");
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

  public toArray(): PortInfo[] {
    const list = [];
    const size = this.size;
    for (let i = 0; i < size; i++) {
      list.push(this.getPortInfo(i));
    }

    return list as any[];
  }
}
