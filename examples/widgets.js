const fs = require('fs');
const { CameraList, closeQuietly } = require('../src');
// If you launch this example not from library folder, change the previous line to:
// const { CameraList, closeQuietly } = require('@typedproject/gphoto2-driver');

const cameraList = new CameraList().load();

console.log('Nb camera', cameraList.size);

if (cameraList.size) {
  // Get current camera
  const camera = cameraList.getCamera(0);

  console.log(camera.toString());
  console.log(camera.widgets.toString());

  // camera.widgets => Widget which inherit from Map class
  const widgets = JSON.stringify(camera.widgets, null, 2);
  fs.writeFileSync('../.tmp/widgets.json', widgets, { encoding: 'utf8' });

  closeQuietly(camera);
}

cameraList.close();
