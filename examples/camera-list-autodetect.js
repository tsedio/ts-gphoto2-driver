const SegfaultHandler = require('segfault-handler');
const { CameraList } = require('../src');

SegfaultHandler.registerHandler('crash.log');

const cameraList = new CameraList();

// Auto-detect
cameraList.autodetect();

console.log('Nb camera', cameraList.size);

cameraList.toArray().forEach((cameraInfo, index) => {
  console.log(`[Cam.${index}] model =>`, cameraInfo.model);
  console.log(`[Cam.${index}] port =>`, cameraInfo.port);

  // cameraList.getPortInfo(index);

  /* console.log(`[Cam.portInfo.${index}] name =>`, cameraInfo.portInfo.name);
   console.log(`[Cam.portInfo.${index}] path =>`, cameraInfo.portInfo.path);*/
});

cameraList.close();