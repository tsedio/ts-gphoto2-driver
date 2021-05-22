import path from "path";
import {run, sleep, Camera} from "@tsed/gphoto2-driver";

// This example illustrates the usecase, where you need to capture liveview from the camera
// and then save it to .mjpg file. The file will be updated in live mode.

const NUMBER_OF_SECONDS_TO_WRITE = 10;
const PATH_TO_SAVE = path.join(__dirname, "../.tmp/live.mjpg"); // Make sure that this folder exists

run(async () => {
  const camera = Camera.listen();

  const liveview = camera.liveview({
    output: "file",
    fps: 24, // Number of frames per second. Default is 24.
    filePath: PATH_TO_SAVE
  });

  liveview.start();

  await sleep(NUMBER_OF_SECONDS_TO_WRITE * 1000);

  liveview.stop();
}, {});
