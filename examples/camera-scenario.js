const { Camera, closeQuietly, CameraWidgets } = require('../src');
const path = require('path');
const autoFocus = false;
const preview = false;
const capture = true;
const camera = new Camera();


try {
  camera.initialize();

  console.log('Camera Loaded');
  console.log('=========');
  if (autoFocus) {
    console.log('Auto focus');
    const cfg = new CameraWidgets(camera);


    process.on('exit', () => {
      closeQuietly(cfg);
    });

    try {
      cfg.setValue('/actions/autofocusdrive', true);
      cfg.apply();
    } finally {
      closeQuietly(cfg);
    }
  }
  console.log('=========');
  if (preview) {
    console.log('Preview');
    const cameraFile = camera.capturePreview();

    if (cameraFile) {
      console.log('PreviewFile');
      try {
        cameraFile.save(path.join(__dirname, 'preview.jpg'));
      }
      catch (er) {
        console.error(er);
      }
      finally {
        closeQuietly(cameraFile);
      }
    }


    camera.deinitialize();
    camera.initialize();
  }
  console.log('=========');

  if (capture) {
    console.log('Capture');
    const cf2 = camera.captureImage();

    try {
      // console.log('==>', path.join(__dirname, 'capture.jpg'));
      cf2.save(path.join(__dirname, 'capture.jpg'));
    } finally {
      closeQuietly(cf2);
    }
  }


} finally {
  closeQuietly(camera);
}
