import {$log} from "@tsed/logger";
import path from "path";
import {Camera, run} from "@tsed/gphoto2-driver";

runScenario({
  autoFocus: true,
  triggerCapture: false,
  capture: true,
  preview: false
});

function runScenario({autoFocus = false, preview = false, capture = false, triggerCapture = false}) {
  return run(async () => {
    const camera = Camera.listen();

    if (autoFocus) {
      $log.info("Autofocus =============================");
      camera.autoFocus();
    }

    if (preview) {
      $log.info("Preview ===============================");
      const filePath = path.join(__dirname, "../.tmp/preview.jpg");

      await camera.capturePreviewAsync(filePath);

      $log.info("File saved on", filePath);
    }

    if (triggerCapture) {
      $log.info("Trigger Capture =======================");
      await camera.triggerCaptureAsync();
    }

    if (capture) {
      $log.info("Capture ===============================");

      const filePath = path.join(__dirname, "../.tmp/capture.jpg");

      await camera.captureImageAsync(filePath);
      $log.info("File saved on", filePath);
    }
  });
}
