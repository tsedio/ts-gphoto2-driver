import {PointerPortInfoList, RefPortInfoList} from "@tsed/gphoto2-core";
import {$log} from "@tsed/logger";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class PortInfoList extends PointerWrapper<PointerPortInfoList> {
  private map: Map<string, PortInfo> = new Map();

  constructor() {
    super({method: "gp_port_info_list", refType: RefPortInfoList});
  }

  /**
   *
   * @param {number} index
   * @returns {PortInfo}
   */
  getPortInfo(index: number): PortInfo {
    $log.debug("Get port info...");

    const portInfo = new PortInfo();

    this.call("get_info", index, portInfo.buffer);

    $log.debug("Get port info... ok");
    return portInfo;
  }

  async getPortInfoAsync(index: number): Promise<PortInfo> {
    $log.debug("Get port info...");

    const portInfo = new PortInfo();

    await this.callAsync("get_info", index, portInfo.buffer);

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

  toArray(): PortInfo[] {
    const list = [];
    const size = this.size;

    for (let i = 0; i < size; i++) {
      $log.debug("Collect port info", i);
      list.push(this.getPortInfo(i));
    }

    return list as any[];
  }

  protected $afterLoaded() {
    this.toArray().forEach((portInfo) => {
      this.map.set(portInfo.path, portInfo);
    });
  }
}
