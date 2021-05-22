import {CameraList, PortInfoList, run} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

run(
  () => {
    const cameraList = new CameraList();
    const portList = new PortInfoList().load();

    // Auto-detect
    cameraList.autodetect();

    $log.info("Nb camera", cameraList.size);

    cameraList.toArray().forEach((cameraInfo, index) => {
      $log.info(`[Cam.${index}] model =>`, cameraInfo.model);
      $log.info(`[Cam.${index}] port =>`, cameraInfo.port);

      const portInfo = portList.findByPath(cameraInfo.port);
      if (portInfo) {
        $log.info(`[Cam.${index}] portInfo =>`, portInfo.name);
        $log.info(`[Cam.${index}] portInfo =>`, portInfo.path);
      }
    });

    cameraList.close();
  },
  {logLevel: "debug"}
);
