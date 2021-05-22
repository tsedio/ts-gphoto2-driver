// This example illustrates the usecase, where you need to capture liveview from the camera
// and get live output of each frame as binary (Buffer) or base64

// To check if liveview works with your camera, you can just use
// node examples/camera-liveview.js | xxd | grep ffd9
// if you see a lot of ffd9 (not in the first column) - then it works
import {Camera, sleep, run} from "@tsed/gphoto2-driver";

const NUMBER_OF_SECONDS_TO_LISTEN = 10;

run(
  async () => {
    const camera = new Camera();

    const OUTPUT = "binary";
    // change these lines to see base64 output
    // const OUTPUT = "base64";

    camera.initialize();

    const liveview = camera.liveview({
      output: OUTPUT,
      fps: 24 // Number of frames per second. Default is 24.
    });

    liveview.on("data", (data) => {
      process.stdout.write(data); // We can not use console.log for binary, because it puts \n after each line
    });

    liveview.start();

    await sleep(NUMBER_OF_SECONDS_TO_LISTEN * 1000);
    liveview.stop();
  },
  {logLevel: "debug"}
);
