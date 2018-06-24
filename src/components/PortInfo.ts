import {types} from "ref";
import {GPPointer} from "../driver";
import {PointerPortInfo, RefPortInfo} from "../driver/modules";
import {PointerWrapper} from "./PointerWrapper";

export class PortInfo extends PointerWrapper<PointerPortInfo> {
  constructor() {
    super("gp_port_info", RefPortInfo);
  }

  get name() {
    const ref = GPPointer<string>(types.CString);

    this.call("get_name", ref);

    return ref.deref();
  }

  get path() {
    const ref = GPPointer<string>(types.CString);

    this.call("get_path", ref);

    return ref.deref();
  }

  toString() {
    return `PortInfo{${this.name}:${this.path}}`;
  }

  close() {
    return this;
  }
}