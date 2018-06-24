const { Camera, closeQuietly } = require('../src');
const path = require('path');
const camera = new Camera();

camera.initialize();

if (!camera.isClosed()) {
  console.log('Camera =>', camera);

  const cameraFile = camera.captureImage();

  cameraFile.save(path.join(__dirname, '../.tmp/capture.jpeg'));

  closeQuietly(cameraFile);
  closeQuietly(camera);
}
