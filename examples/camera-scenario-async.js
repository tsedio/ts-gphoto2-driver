const { Camera, closeQuietly, CameraWidgets } = require('../src');
// If you launch this example not from library folder, change the previous line to:
// const { Camera, closeQuietly, CameraWidgets } = require('@typedproject/gphoto2-driver');

const path = require('path');

const camera = new Camera();

console.log('[GPDRIVER] Camera init');
camera.initialize();

runScenario({
  autoFocus: true,
  triggerCapture: false,
  capture: true,
  preview: false
})
  .catch((er) => {
    console.error(er.message);
    return Promise.resolve();
  })
  .then(() => {
    closeQuietly(camera);
  });


function runScenario({ autoFocus = false, preview = false, capture = false, triggerCapture = false }) {
  console.log('[GPDRIVER] Camera Loaded');

  return Promise
    .resolve()
    .then(() => {
      if (autoFocus) {
        console.log('[GPDRIVER] Autofocus =============================');
        return runAutofocus();
      }
    })
    .then(() => {
      if (preview) {
        console.log('[GPDRIVER] Preview ===============================');
        return runPreview();
      }
    })
    .then(() => {
      if (triggerCapture) {
        console.log('[GPDRIVER] Trigger Capture =======================');
        return runTriggerCapture();
      }
    })
    .then(() => {
      if (capture) {
        console.log('[GPDRIVER] Capture ===============================');
        return runCapture();
      }
    });
}

/**
 *
 */
function runAutofocus() {
  try {
    camera.widgets.get('/actions/autofocusdrive').value = true;
  } catch (er) {
    console.warn(er);
  }
}

/**
 *
 */
function runPreview() {
  const filePath = path.join(__dirname, '../.tmp/preview.jpg');

  return camera
    .capturePreviewAsync(filePath)
    .then(() => {
      console.log('File saved on', filePath);
    });
}

/**
 *
 */
function runTriggerCapture() {
  return camera.triggerCaptureAsync();
}

/**
 *
 */
function runCapture() {
  const filePath = path.join(__dirname, '../.tmp/capture.jpg');

  return camera
    .captureImageAsync(filePath)
    .then(() => {
      console.log('File saved on', filePath);
    });
}