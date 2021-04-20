const fs = require("fs");
const {CameraList, CameraWidgets, closeQuietly} = require("@tsed/gphoto2-driver");

const cameraList = new CameraList().load();

console.log("Nb camera", cameraList.size);

if (cameraList.size) {
  // Get current camera
  const camera = cameraList.getCamera(0);

  console.log(camera.toString());
  console.log(camera.widgets.toString());

  // change value
  camera.widgets.get("/actions/autofocusdrive").value = true;
  camera.widgets.get("/settings/autofocus").value = "on";

  // OR apply
  camera.widgets.apply({
    "/actions/autofocusdrive": true,
    "/settings/autofocus": "on"
  });

  console.log("/actions/autofocusdrive", camera.widgets.get("/actions/autofocusdrive").value);
  console.log("/settings/autofocus", camera.widgets.get("/settings/autofocus").value);

  const lightmeter = camera.widgets.get("/status/flashopen");

  setInterval(() => {
    camera.widgets.refresh();
    console.log("/status/flashopen (1) =>", new CameraWidgets(camera).get("/status/flashopen").value);
    console.log("/status/flashopen (2) =>", lightmeter.value);
  }, 1000);

  // camera.widgets => Widget which inherit from Map class
  const widgets = JSON.stringify(camera.widgets, null, 2);
  fs.writeFileSync("../.tmp/widgets.json", widgets, {encoding: "utf8"});

  // closeQuietly(camera);
}

// cameraList.close();
