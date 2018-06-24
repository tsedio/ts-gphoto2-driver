const SegfaultHandler = require('segfault-handler');
const path = require('path');
const { CameraList, closeQuietly } = require('../src');

SegfaultHandler.registerHandler('crash.log');

const cameraList = new CameraList().load();

console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  const camera = cameraList.getCamera(0);
  console.log('Camera =>', camera);

  const cameraFile = camera.captureImage();

  cameraFile.save(path.join(__dirname, 'capture.jpeg'));

  closeQuietly(cameraFile);
  closeQuietly(camera);
}

cameraList.close();
