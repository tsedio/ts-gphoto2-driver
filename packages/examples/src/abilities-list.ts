import {AbilitiesList, checkCode, GPhoto2Driver, PortInfoList, GPPointerString, run} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

run(
  () => {
    const abilitiesList = new AbilitiesList();
    const portList = new PortInfoList();

    portList.load();
    abilitiesList.load();

    $log.info("Nb Abilities =>", abilitiesList.size);

    const list = abilitiesList.detect(portList);
    const size = GPhoto2Driver.gp_list_count(list.pointer);

    $log.info("Camera list nb =>", size);

    for (let i = 0; i < size; i++) {
      const name = GPPointerString();
      const value = GPPointerString();

      checkCode(GPhoto2Driver.gp_list_get_name(list.pointer, i, name));
      checkCode(GPhoto2Driver.gp_list_get_value(list.pointer, i, value));

      $log.info("path =>", name.deref());
      $log.info("value =>", value.deref());
    }

    abilitiesList.close();
    portList.close();
  },
  {logLevel: "debug"}
);
