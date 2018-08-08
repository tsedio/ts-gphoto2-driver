const { Camera, closeQuietly } = require('../src');
const path = require('path');
const camera = new Camera();

camera.initialize();

if (!camera.isClosed()) {
  const liveview = camera.liveview();

  liveview.on('data', (chunk) => {
    process.stdout.write(chunk);
  });

  liveview.start();

  setTimeout(() => {

    liveview.stop();

    closeQuietly(camera);
  }, 10000);
}
