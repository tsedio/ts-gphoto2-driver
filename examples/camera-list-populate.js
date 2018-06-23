const { CameraList } = require('../src');

const cameraList = new CameraList();

// Method from javascript
cameraList.populate();

console.log('Nb camera', cameraList.size);

cameraList.toArray().forEach((cameraInfo) => {
  console.log(`[Cam.${index}] model =>`, cameraInfo.model);
  console.log(`[Cam.${index}] port =>`, cameraInfo.port);
  console.log(`[Cam.portInfo.${index}] name =>`, cameraInfo.portInfo.name);
  console.log(`[Cam.portInfo.${index}] path =>`, cameraInfo.portInfo.path);
});

cameraList.close();