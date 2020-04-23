const SegfaultHandler = require('segfault-handler');
const path = require('path');
const { CameraList, closeQuietly } = require('@typedproject/gphoto2-driver');

SegfaultHandler.registerHandler('crash.log');

const cameraList = new CameraList().load();

console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  const camera = cameraList.getCamera(0);


  if (!camera.isClosed()) {
    console.log('Camera =>', camera);

    const cameraFile = camera.captureImage();

    cameraFile.save(path.join(__dirname, '../.tmp/capture.jpeg'));

    closeQuietly(cameraFile);
    closeQuietly(camera);
  }
}

cameraList.close();
