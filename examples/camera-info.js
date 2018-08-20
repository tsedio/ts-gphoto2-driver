const SegfaultHandler = require('segfault-handler');
const path = require('path');
const { CameraList, closeQuietly } = require('../src');
// If you launch this example not from library folder, change the previous line to:
// const { CameraList, closeQuietly  } = require('@typedproject/gphoto2-driver');

SegfaultHandler.registerHandler('crash.log');

const cameraList = new CameraList().load();

console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  const camera = cameraList.getCamera(0);
  console.log('Camera summary =>', camera.getSummary());
  console.log('----------------------------------------');
  console.log('Camera about =>', camera.getAbout());

  console.log('----------------------------------------');
  try {
    console.log('Camera manual =>', camera.getManual());
  } catch (er) {
    console.warn('Camera manual =>', er.message);
  }

  closeQuietly(camera);
}

cameraList.close();
