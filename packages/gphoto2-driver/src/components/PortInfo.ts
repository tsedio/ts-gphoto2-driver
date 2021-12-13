import {types, GPPointer, PointerPortInfo, RefPortInfo} from "@tsed/gphoto2-core";
import {PointerWrapper} from "./PointerWrapper";

export class PortInfo extends PointerWrapper<PointerPortInfo> {
  constructor() {
    super({method: "gp_port_info", refType: RefPortInfo});
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
