// This example illustrates the usecase, where you need to capture liveview from the camera
// and get live output of each frame as binary (Buffer) or base64

// To check if liveview works with your camera, you can just use
// node examples/camera-liveview.js | xxd | grep ffd9
// if you see a lot of ffd9 (not in the first column) - then it works
import {Camera, run, sleep} from "@tsed/gphoto2-driver";
import fs from "fs";
import path from "path";

const NUMBER_OF_SECONDS_TO_LISTEN = 10;
const PATH_TO_SAVE = path.join(__dirname, "../.tmp/live");
let id = 0;
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
      fs.writeFile(`${PATH_TO_SAVE + id}.jpg`, data, () => {
        console.log("Written");
      });
      id++;
    });

    liveview.start();

    await sleep(NUMBER_OF_SECONDS_TO_LISTEN * 1000);
    liveview.stop();
  },
  {logLevel: "debug"}
);
