import {$log} from "@tsed/logger";
import {FakeStruct} from "../__mock__/FakeBuffer";
import {getGPhoto2Driver, StructCameraFilePath} from "@tsed/gphoto2-core";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {CameraFilePath} from "@tsed/gphoto2-driver";

$log.stop();

const cameraFilePath = new FakeStruct({
  name: "fileName",
  folder: "path"
});

(StructCameraFilePath as any).mockReturnValue(cameraFilePath.deref());

jest.mock("@tsed/gphoto2-core");
jest.mock("ref-napi", () => {
  return {
    ...jest.requireActual("ref-napi"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/ref-napi")
  };
});

function createCameraFilePathFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const cameraFilePath = new CameraFilePath();

  return {driver, cameraFilePath};
}

describe("CameraFilePath", () => {
  describe("path", () => {
    it("should return path", () => {
      const {cameraFilePath} = createCameraFilePathFixture();

      expect(cameraFilePath.path).toEqual("path");

      cameraFilePath.close();
    });
  });
  describe("filename", () => {
    it("should return filename", () => {
      const {cameraFilePath} = createCameraFilePathFixture();

      expect(cameraFilePath.filename).toEqual("fileName");
    });
  });

  describe("toString()", () => {
    it("should return value", () => {
      const {cameraFilePath} = createCameraFilePathFixture();

      expect(cameraFilePath.toString()).toEqual("CameraFilePath{path fileName}");
    });
  });
});
