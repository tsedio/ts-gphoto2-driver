import {checkCode, GPhoto2Driver} from "../driver";
import {PointerPortInfoList, RefPortInfoList} from "../driver/modules";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfo} from "./PortInfo";

export class PortInfoList extends PointerWrapper<PointerPortInfoList> {

  constructor() {
    super("gp_port_info_list", RefPortInfoList);
    this.load();
  }

  get size(): number {
    return checkCode(GPhoto2Driver.gp_port_info_list_count(this.pointer), "gp_port_info_list_count");
  }


  /**
   *
   */
  load(): this {
    checkCode(GPhoto2Driver.gp_port_info_list_load(this.pointer), "gp_port_info_list_load");
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
