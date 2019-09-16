const {Camera, closeQuietly, CameraWidgets} = require("@typedproject/gphoto2-driver");
// If you launch this example not from library folder, change the previous line to:
// const { Camera, closeQuietly, CameraWidgets } = require('@typedproject/gphoto2-driver');

const path = require("path");

const camera = new Camera();

try {
  console.log("[GPDRIVER] Camera init");
  camera.initialize();

  runScenario({
    autoFocus: true,
    triggerCapture: true,
    capture: true,
    preview: true
  });
} catch (er) {
  console.error(er.message);
} finally {
  closeQuietly(camera);
}

function runScenario ({autoFocus = false, preview = false, capture = false, triggerCapture = false}) {
  console.log("[GPDRIVER] Camera Loaded");

  try {
    if (autoFocus) {
      console.log("[GPDRIVER] Autofocus =============================");
      runAutofocus();
    }
  } catch (er) {
    console.warn("Autofocus fail", er.message);
  }

  try {
    if (preview) {
      console.log("[GPDRIVER] Preview ===============================");
      runPreview();
    }
  } catch (er) {
    console.warn("Preview fail", er.message);
  }

  try {
    if (triggerCapture) {
      console.log("[GPDRIVER] Trigger Capture =======================");
      runTriggerCapture();
    }
  } catch (er) {
    console.warn("triggerCapture fail", er.message);
  }

  try {
    if (capture) {
      console.log("[GPDRIVER] Capture ===============================");
      runCapture();
    }
  } catch (er) {
    console.warn("capture fail", er.message);
  }

}

/**
 *
 */
function runAutofocus () {
  try {
    camera.widgets.get("/actions/autofocusdrive").value = true;
  } catch (er) {
    console.warn(er);
  }
}

/**
 *
 */
function runPreview () {
  const filePath = path.join(__dirname, "../.tmp/preview.jpg");
  camera.capturePreview(filePath);
  console.log("File saved on", filePath);
}

/**
 *
 */
function runTriggerCapture () {
  camera.triggerCapture();
}

/**
 *
 */
function runCapture () {
  const filePath = path.join(__dirname, "../.tmp/capture.jpg");

  camera.captureImage(filePath);
  console.log("File saved on", filePath);
}
