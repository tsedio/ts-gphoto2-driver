import {newPointerPortInfoList} from "../driver";
import {GPhoto2Driver} from "../driver/GPhoto2Driver";
import {checkCode} from "../driver/utils/GPUtils";
import {ICloseable} from "../interfaces/ICloseable";

export class PortInfoList implements ICloseable {
  readonly pointer = newPointerPortInfoList();

  constructor() {
    this.load();
  }

  /**
   *
   */
  load(): this {
    checkCode(GPhoto2Driver.gp_port_info_list_load(this.pointer));
    return this;
  }

  /**
   *
   */
  close(): this {
    GPhoto2Driver.gp_port_info_list_free(this.pointer);
    return this;
  }
}
