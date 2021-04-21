import {checkCode, getGPhoto2Driver, PointerAbilitiesList, RefAbilitiesList} from "@tsed/gphoto2-core";
import {Context} from "./Context";
import {List} from "./List";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfoList} from "./PortInfoList";

export class AbilitiesList extends PointerWrapper<PointerAbilitiesList> {
  constructor() {
    super({method: "gp_abilities_list", refType: RefAbilitiesList});
  }

  get size(): number {
    return checkCode(getGPhoto2Driver().gp_abilities_list_count(this.pointer), "gp_abilities_list_count");
  }

  /**
   *
   */
  load(): this {
    checkCode(getGPhoto2Driver().gp_abilities_list_load(this.pointer, Context.get().pointer), "gp_abilities_list_load");

    return this;
  }

  /**
   *
   * @param {PortInfoList} portInfoList
   * @returns {List}
   */
  detect(portInfoList: PortInfoList): List<any> {
    const list = new List();

    checkCode(
      getGPhoto2Driver().gp_abilities_list_detect(this.pointer, portInfoList.pointer, list.pointer, Context.get().pointer),
      "gp_abilities_list_detect"
    );

    return list;
  }
}
