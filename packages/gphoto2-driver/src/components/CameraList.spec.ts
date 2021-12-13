import {$log} from "@tsed/logger";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {getGPhoto2Driver, GPPointerString} from "@tsed/gphoto2-core";
import {CameraList, Context} from "@tsed/gphoto2-driver";
import {alloc} from "../__mock__/ref-napi";

$log.stop();

jest.mock("@tsed/gphoto2-core", () => {
  return {
    ...jest.requireActual("@tsed/gphoto2-core"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/gphoto2-core")
  };
});

(GPPointerString as any).mockReturnValue(alloc("string"));

function createCameraListFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const list = new CameraList();

  return {driver, list};
}

describe("CameraList", () => {
  describe("autodetect()", () => {
    it("should autodetect camera", () => {
      const {list, driver} = createCameraListFixture();

      list.autodetect();

      expect(driver.run).toHaveBeenCalledWith("gp_camera_autodetect", list.pointer, Context.get().pointer);
    });
  });

  describe("autodetectAsync()", () => {
    it("should autodetect camera", async () => {
      const {list, driver} = createCameraListFixture();

      await list.autodetectAsync();

      expect(driver.runAsync).toHaveBeenCalledWith("gp_camera_autodetect", list.pointer, Context.get().pointer);
    });
  });

  describe("load()", () => {
    it("should load camera list", () => {
      const {list, driver} = createCameraListFixture();

      list.load();

      expect(driver.run).toBeCalledTimes(13);
    });
  });

  describe("loadAsync()", () => {
    it("should load camera list", async () => {
      const {list, driver} = createCameraListFixture();

      await list.loadAsync();

      expect(driver.run).toBeCalledTimes(12);
    });
  });
});
