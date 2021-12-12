import {$log} from "@tsed/logger";
import {getGPhoto2Driver} from "@tsed/gphoto2-core";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {CameraFileFromFd} from "@tsed/gphoto2-driver";

$log.stop();

jest.mock("@tsed/gphoto2-core");
jest.mock("ref-napi", () => {
  return {
    ...jest.requireActual("ref-napi"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/ref-napi")
  };
});

function createCameraFileFromFdFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const cameraFileFromFd = new CameraFileFromFd(0);

  return {driver, cameraFileFromFd};
}

describe("CameraFileFromFd", () => {
  describe("path", () => {
    it("should return path", () => {
      const {driver, cameraFileFromFd} = createCameraFileFromFdFixture();

      expect(driver.run).toHaveBeenCalledWith("gp_file_new_from_fd", cameraFileFromFd.buffer, 0);
    });
  });
});
