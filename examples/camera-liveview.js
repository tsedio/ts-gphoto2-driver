// This example illustrates the usecase, where you need to capture liveview from the camera
// and get live output of each frame as binary (Buffer) or base64

// To check if liveview works with your camera, you can just use
// node examples/camera-liveview.js | xxd | grep ffd9
// if you see a lot of ffd9 (not in the first column) - then it works

const { Camera } = require('@typedproject/gphoto2-driver');
const camera = new Camera();

const NUMBER_OF_SECONDS_TO_LISTEN = 10;
const NUMBER_OF_SECONDS_TO_WAIT = 10;
const OUTPUT = "binary";
// change these lines to see base64 output
// const OUTPUT = "base64";

camera.initialize();

const liveview = camera.liveview({
  output: OUTPUT,
  fps: 24, // Number of frames per second. Default is 24.
});

liveview.on("data", (data, size) => {
  process.stdout.write(data); // We can not use console.log for binary, becayse it puts \n after each line
});

liveview.start();

setTimeout(() => {

  liveview.stop();

}, NUMBER_OF_SECONDS_TO_LISTEN * 1000);

setTimeout(() => {
  // Here we wait for NUMBER_OF_SECONDS_TO_WAIT + NUMBER_OF_SECONDS_TO_LISTEN and then
  // launch liveview one more time
  // The output should be caught by original liveview.on("data") event handler
  liveview.start();

  setTimeout(() => {

    liveview.stop();

    camera.closeQuietly(); // Do not forget to close camera
  }, NUMBER_OF_SECONDS_TO_LISTEN * 1000);
}, (NUMBER_OF_SECONDS_TO_WAIT + NUMBER_OF_SECONDS_TO_LISTEN) * 1000)
