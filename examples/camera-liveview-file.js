// This example illustrates the usecase, where you need to capture liveview from the camera
// and then save it to .mjpg file. The file will be updated in live mode.

const { Camera } = require('../src');
// If you launch this example not from library folder, change the previous two lines to:
// const { Camera } = require('@typedproject/gphoto2-driver');
const path = require('path');
const camera = new Camera();

const NUMBER_OF_SECONDS_TO_WRITE = 10;
const PATH_TO_SAVE = path.join(__dirname, '../.tmp/live.mjpg'); // Make sure that this folder exists

camera.initialize();

const liveview = camera.liveview({
  output: "file",
  fps: 24, // Number of frames per second. Default is 24.
  filePath: PATH_TO_SAVE,
});

liveview.start();

setTimeout(() => {

  liveview.stop();

  camera.closeQuietly();
}, NUMBER_OF_SECONDS_TO_WRITE * 1000);
