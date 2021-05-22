import {Camera, run} from "@tsed/gphoto2-driver";
import path from "path";

run(
  () => {
    const camera = Camera.listen();

    if (!camera.isClosed()) {
      const cameraFile = camera.captureImage();

      cameraFile?.save(path.join(__dirname, "../.tmp/capture.jpeg"));
    }
  },
  {logLevel: "debug"}
);
