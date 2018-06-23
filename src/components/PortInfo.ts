import {PointerPortInfo} from "../driver/modules";
import {PointerWrapper} from "./PointerWrapper";

export class PortInfo extends PointerWrapper<PointerPortInfo> {

  constructor() {
    super("gp_port_info");
  }

  close() {
    return this;
  }
}
