import {CameraList, run, sleep} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";
import fs from "fs";
import {ensureDirSync} from "fs-extra";

const Table = require("cli-table3");

run(async () => {
  const camera = CameraList.getCamera(0);

  if (!camera) {
    $log.error("No camera found");
    return;
  }

  $log.info(camera.toString());

  const table = new Table({
    head: ["Path", "Value"]
  });

  table.push(...Object.entries(camera.widgets.getInformation()));

  $log.info("\n", table.toString());

  // change value
  camera.widgets.get("/actions/autofocusdrive").value = true;
  camera.widgets.get("/settings/autofocus").value = "on";

  // OR apply rule in a one call
  camera.widgets.apply({
    "/actions/autofocusdrive": true,
    "/settings/autofocus": "on"
  });

  $log.info("/actions/autofocusdrive", camera.widgets.get("/actions/autofocusdrive").value);
  $log.info("/settings/autofocus", camera.widgets.get("/settings/autofocus").value);

  const lightmeter = camera.widgets.get("/status/flashopen");

  camera.openFlash();

  await sleep(1000);

  camera.widgets.refresh();

  $log.info("/status/flashopen =>", lightmeter.value);

  // camera.widgets => Widget which inherit from Map class
  const widgets = JSON.stringify(camera.widgets, null, 2);

  ensureDirSync("../.tmp");
  fs.writeFileSync("../.tmp/widgets.json", widgets, {encoding: "utf8"});
});
