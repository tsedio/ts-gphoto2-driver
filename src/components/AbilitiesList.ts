import {GPhoto2Driver, newPointerAbilitiesList} from "../driver";
import {checkCode} from "../driver/utils/GPUtils";
import {ICloseable} from "../interfaces/ICloseable";
import {Context} from "./Context";
import {List} from "./List";
import {PortInfoList} from "./PortInfoList";

export class AbilitiesList implements ICloseable {
  readonly pointer = newPointerAbilitiesList();

  constructor() {
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

  /**
   *
   * @returns {this}
   */
  close(): this {
    GPhoto2Driver.gp_abilities_list_free(this.pointer);

    return this;
  }
}
