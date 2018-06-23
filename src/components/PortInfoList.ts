import {checkCode, GPhoto2Driver, PointerList} from "../driver";
import {PointerWrapper} from "./PointerWrapper";

export class PortInfoList extends PointerWrapper<PointerList> {

  constructor() {
    super("gp_port_info_list");
    this.load();
  }

  /**
   *
   */
  load(): this {
    checkCode(GPhoto2Driver.gp_port_info_list_load(this.pointer));
    return this;
  }
}
