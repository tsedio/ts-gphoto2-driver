import {PointerAbilitiesList, RefAbilitiesList} from "@tsed/gphoto2-core";
import {$log} from "@tsed/logger";
import {Context} from "./Context";
import {List} from "./List";
import {PointerWrapper} from "./PointerWrapper";
import {PortInfoList} from "./PortInfoList";

export class AbilitiesList extends PointerWrapper<PointerAbilitiesList> {
  constructor() {
    super({method: "gp_abilities_list", refType: RefAbilitiesList, loadWithContext: true});
  }

  /**
   *
   * @param {PortInfoList} portInfoList
   * @returns {List}
   */
  detect(portInfoList: PortInfoList): List<any> {
    $log.debug("Get available camera list");

    const list = new List();

    this.call("detect", portInfoList.pointer, list.pointer, Context.get().pointer);

    $log.debug("Get available camera list... ok");

    return list;
  }

  async detectAsync(portInfoList: PortInfoList): Promise<List<any>> {
    $log.debug("Get available camera list");

    const list = new List();

    await this.callAsync("detect", portInfoList.pointer, list.pointer, Context.get().pointer);

    $log.debug("Get available camera list... ok");

    return list;
  }
}
