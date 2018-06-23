import {checkCode, GPhoto2Driver} from "../driver";
import {PointerAbilityList} from "../driver/modules";
import {Context} from "./Context";
import {List} from "./List";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfoList} from "./PortInfoList";

export class AbilitiesList extends PointerWrapper<PointerAbilityList> {

  constructor() {
    super("gp_abilities_list");
    this.load();
  }

  /**
   *
   */
  load(): this {
    checkCode(GPhoto2Driver.gp_abilities_list_load(this.pointer, Context.get().pointer));

    return this;
  }

  /**
   *
   * @param {PortInfoList} portInfoList
   * @returns {List}
   */
  detect(portInfoList: PortInfoList): List<any> {
    const list = new List();

    checkCode(GPhoto2Driver.gp_abilities_list_detect(this.pointer, portInfoList.pointer, list.pointer, Context.get().pointer));

    return list;
  }
}
