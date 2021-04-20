const { Camera, closeQuietly, GPPortType, GPCameraDriverStatus, GPCameraFileOperation, GPCameraFolderOperation, GPDeviceType } = require('@tsed/gphoto2-driver');
const camera = new Camera();

try {
  console.log('[GPDRIVER] Camera init');
  camera.initialize();

  console.log('==> abilities.model', camera.getAbilities().model);
  console.log('==> abilities.port', GPPortType[camera.getAbilities().port]);
  console.log('==> abilities.status', GPCameraDriverStatus[camera.getAbilities().status]);
  console.log('==> abilities.id', camera.getAbilities().id);
  console.log('==> abilities.library', camera.getAbilities().library);
  console.log('==> abilities.operation', camera.getAbilities().operation);
  console.log('==> abilities.fileOperations', GPCameraFileOperation[camera.getAbilities().fileOperations]);
  console.log('==> abilities.folderOperations', GPCameraFolderOperation[camera.getAbilities().folderOperations]);
  console.log('==> abilities.usbVendor', camera.getAbilities().usbVendor);
  console.log('==> abilities.usbProduct', camera.getAbilities().usbProduct);
  console.log('==> abilities.usbClass', camera.getAbilities().usbClass);
  console.log('==> abilities.usbSubclass', camera.getAbilities().usbSubclass);
  console.log('==> abilities.deviceType', GPDeviceType[camera.getAbilities().deviceType]);
  console.log('==> abilities.speed', camera.getAbilities().speed);

} catch (er) {
  console.error(er.message);
} finally {
  closeQuietly(camera);
}

