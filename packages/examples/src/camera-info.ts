import {CameraList, run} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

run(
  () => {
    const cameraList = new CameraList().load();

    $log.info("Nb camera", cameraList.size);

    if (cameraList.size) {
      const camera = cameraList.getCamera(0);

      if (camera) {
        $log.info("Camera summary =>", camera.getSummary());
        $log.info("----------------------------------------");
        $log.info("Camera about =>", camera.getAbout());
        $log.info("----------------------------------------");
        try {
          $log.info("Camera manual =>", camera.getManual());
        } catch (er) {
          $log.warn("Camera manual =>", er.message);
        }
      }
    }
  },
  {logLevel: "debug"}
);
