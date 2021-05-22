import {CameraList, run} from "@tsed/gphoto2-driver";
import path from "path";

run(
  () => {
    const cameraList = new CameraList().load();

    if (cameraList?.size) {
      const camera = cameraList.getCamera(0);

      if (camera) {
        if (!camera.isClosed()) {
          const cameraFile = camera.captureImage();

          if (cameraFile) {
            cameraFile.save(path.join(__dirname, "../.tmp/capture.jpeg"));
          }
        }
      }
    }
  },
  {logLevel: "debug"}
);
