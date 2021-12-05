import {run, Camera} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";
import path from "path";

runScenario({
  autoFocus: true,
  triggerCapture: true,
  capture: true,
  preview: true
});

function runScenario({autoFocus = false, preview = false, capture = false, triggerCapture = false}) {
  return run(() => {
    const camera = Camera.listen();

    if (autoFocus) {
      $log.info("Autofocus  =============================");
      camera.autoFocus();
    }

    if (preview) {
      $log.info("Preview ===============================");
      const filePath = path.join(__dirname, "../.tmp/preview.jpg");

      camera.capturePreview(filePath);

      $log.info("File saved on", filePath);
    }

    if (triggerCapture) {
      $log.info("Trigger Capture =======================");
      camera.triggerCapture();
    }

    if (capture) {
      $log.info("Capture ===============================");

      const filePath = path.join(__dirname, "../.tmp/capture.jpg");

      camera.captureImage(filePath);
      $log.info("File saved on", filePath);
    }
  });
}
