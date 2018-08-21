// This example illustrates the usecase, where you need to capture liveview from the camera
// and get live output of each frame in base64

const { Camera } = require('../src');
// If you launch this example not from library folder, change the previous two lines to:
// const { Camera } = require('@typedproject/gphoto2-driver');
const camera = new Camera();

const NUMBER_OF_SECONDS_TO_LISTEN = 10;

camera.initialize();

if (!camera.isClosed()) {
  const liveview = camera.liveview({
    output: "base64",
    fps: 24, // Number of frames per second. Default is 24.
  });

  liveview.start();

  liveview.on("data", (data, size) => {
    console.log("base64 of the frame", data);
    console.log("Size of the frame", size);
  });

  setTimeout(() => {

    liveview.stop();

    camera.closeQuietly();
  }, NUMBER_OF_SECONDS_TO_LISTEN * 1000);
}
