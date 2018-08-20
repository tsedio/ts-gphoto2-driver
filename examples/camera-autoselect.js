const { Camera, closeQuietly } = require('../src');
// If you launch this example not from library folder, change the previous line to:
// const { Camera, closeQuietly  } = require('@typedproject/gphoto2-driver');
const path = require('path');
const camera = new Camera();

camera.initialize();

if (!camera.isClosed()) {
  console.log('Camera =>', camera.toString());

  const cameraFile = camera.captureImage();

  cameraFile.save(path.join(__dirname, '../.tmp/capture.jpeg'));

  closeQuietly(cameraFile);
  closeQuietly(camera);
}
