const { Camera, closeQuietly, CameraWidgets } = require('../lib');
const path = require('path');

const camera = new Camera();

try {
  console.log('[GPDRIVER] Camera init');
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


function runScenario({ autoFocus = false, preview = false, capture = false, triggerCapture = false }) {
  console.log('[GPDRIVER] Camera Loaded');

  if (autoFocus) {
    console.log('[GPDRIVER] Autofocus =============================');
    runAutofocus();
  }

  if (preview) {
    console.log('[GPDRIVER] Preview ===============================');
    runPreview();
  }

  if (triggerCapture) {
    console.log('[GPDRIVER] Trigger Capture =======================');
    runTriggerCapture();
  }

  if (capture) {
    console.log('[GPDRIVER] Capture ===============================');
    runCapture();

    runCapture();
  }
}

/**
 *
 */
function runAutofocus() {
  const cfg = new CameraWidgets(camera);

  try {
    cfg.setValue('/actions/autofocusdrive', true);
    cfg.apply();
  } catch (er) {
    console.warn(er);
  } finally {
    closeQuietly(cfg);
  }
}

/**
 *
 */
function runPreview() {
  const filePath = path.join(__dirname, '../.tmp/preview.jpg');
  camera.capturePreview(filePath);
  console.log('File saved on', filePath);
}

/**
 *
 */
function runTriggerCapture() {
  camera.triggerCapture();
}

/**
 *
 */
function runCapture() {
  const filePath = path.join(__dirname, '../.tmp/capture.jpg');

  camera.captureImage(filePath);
  console.log('File saved on', filePath);
}