import {PortInfoList, run} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

run(() => {
  const portList = new PortInfoList();

  portList.load();

  $log.info("Nb port =>", portList.size);

  portList.toArray().forEach((port, index) => {
    $log.info(`[Port.${index}] name =>`, port.name);
    $log.info(`[Port.${index}] path =>`, port.path);
  });
});
