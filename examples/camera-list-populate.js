const SegfaultHandler = require('segfault-handler');
const { CameraList, PortInfoList } = require('../src');
// If you launch this example not from library folder, change the previous line to:
// const { CameraList, PortInfoList  } = require('@typedproject/gphoto2-driver');

SegfaultHandler.registerHandler('crash.log');

const cameraList = new CameraList().load();
const portList = new PortInfoList().load();

console.log('Nb camera', cameraList.size);

cameraList.toArray().forEach((cameraInfo, index) => {
  console.log(`[Cam.${index}] model =>`, cameraInfo.model);
  console.log(`[Cam.${index}] port =>`, cameraInfo.port);
  const portInfo = portList.findByPath(cameraInfo.port);

  console.log(`[Cam.${index}] portInfo =>`, portInfo.name);
  console.log(`[Cam.${index}] portInfo =>`, portInfo.path);
});

cameraList.close();
portList.close();