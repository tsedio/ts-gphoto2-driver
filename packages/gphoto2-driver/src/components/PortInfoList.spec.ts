import {getGPhoto2Driver, GPPointer} from "@tsed/gphoto2-core";
import {PortInfoList} from "@tsed/gphoto2-driver";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {alloc} from "../__mock__/ref-napi";
import {$log} from "@tsed/logger";

$log.stop();

jest.mock("@tsed/gphoto2-core");
jest.mock("ref-napi", () => {
  return {
    ...jest.requireActual("ref-napi"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/ref-napi")
  };
});

(GPPointer as any).mockImplementation(alloc);

function createPortInfoListFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const portInfoList = new PortInfoList();

  return {driver, portInfoList};
}

describe("PortListInfo", () => {
  describe("size()", () => {
    it("should create a new instance of AbilitiesList", () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockReturnValue(10);

      expect(portInfoList.size).toEqual(10);
      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_count", portInfoList.pointer);
    });
  });
  describe("load()", () => {
    it("should load port info", () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockReturnValue(undefined);

      portInfoList.load();

      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_load", portInfoList.pointer);
    });
  });
  describe("loadAsync()", () => {
    it("should load port info", async () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockReturnValue(undefined);

      await portInfoList.loadAsync();

      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.runAsync).toHaveBeenCalledWith("gp_port_info_list_load", portInfoList.pointer);
    });
  });
  describe("getPortInfo()", () => {
    it("should return port info", async () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockReturnValue(undefined);

      const index = 0;

      const portInfo = await portInfoList.getPortInfo(index);

      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_get_info", portInfoList.pointer, 0, portInfo.buffer);
    });
  });
  describe("getPortInfoAsync()", () => {
    it("should return port info", async () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockReturnValue(undefined);

      const index = 0;

      const portInfo = await portInfoList.getPortInfoAsync(index);

      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.runAsync).toHaveBeenCalledWith("gp_port_info_list_get_info", portInfoList.pointer, 0, portInfo.buffer);
    });
  });
  describe("findByPath()", () => {
    it("should return port info", async () => {
      const {portInfoList, driver} = createPortInfoListFixture();
      driver.run.mockImplementation((method, pointer, ref) => {
        if (method.includes("count")) {
          return 1;
        }

        if (method.includes("get_name")) {
          ref.value = "name";
          return;
        }

        if (method.includes("get_path")) {
          ref.value = "path";
          return;
        }
      });

      portInfoList.load();

      const portInfo = await portInfoList.findByPath("path");

      expect(portInfo?.path).toEqual("path");
      expect(portInfo?.name).toEqual("name");
      expect(portInfo?.toString()).toEqual("PortInfo{name:path}");

      portInfo?.close();
    });
  });
});
