// This example illustrates the usecase, where you need to capture liveview from the camera
// and get live output of each frame as Buffer object (binary data)

const { Camera } = require('../src');
// If you launch this example not from library folder, change the previous two lines to:
// const { Camera } = require('@typedproject/gphoto2-driver');
const camera = new Camera();

const NUMBER_OF_SECONDS_TO_LISTEN = 10;

camera.initialize();

if (!camera.isClosed()) {
  const liveview = camera.liveview({
    output: "binary",
    fps: 24, // Number of frames per second. Default is 24.
  });

  liveview.start();

  liveview.on("data", (data, size) => {
    process.stdout.write(data); // We can not use console.log for binary, becayse it puts \n after each line
  });

  setTimeout(() => {

    liveview.stop();

    camera.closeQuietly();
  }, NUMBER_OF_SECONDS_TO_LISTEN * 1000);
}
