import {AbilitiesList} from "./AbilitiesList";
import {getGPhoto2Driver} from "@tsed/gphoto2-core";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {Context, List, PortInfoList} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

$log.stop();

jest.mock("@tsed/gphoto2-core", () => {
  return {
    ...jest.requireActual("@tsed/gphoto2-core"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/gphoto2-core")
  };
});

function createAbilitiesListFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const abilitiesList = new AbilitiesList();

  return {driver, abilitiesList};
}

describe("AbilitiesList", () => {
  describe("size()", () => {
    it("should create a new instance of AbilitiesList", () => {
      const {abilitiesList, driver} = createAbilitiesListFixture();
      driver.run.mockReturnValue(10);

      expect(abilitiesList.size).toEqual(10);
      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_count", abilitiesList.pointer);
    });
  });
  describe("load()", () => {
    it("should load abilities", () => {
      const {abilitiesList, driver} = createAbilitiesListFixture();
      driver.run.mockReturnValue(undefined);

      abilitiesList.load();

      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_new", abilitiesList.buffer);
      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_load", abilitiesList.pointer, Context.get().pointer);
    });
  });

  describe("loadAsync()", () => {
    it("should load abilities", async () => {
      const {abilitiesList, driver} = createAbilitiesListFixture();
      driver.run.mockReturnValue(undefined);

      await abilitiesList.loadAsync();

      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_new", abilitiesList.buffer);
      expect(driver.runAsync).toHaveBeenCalledWith("gp_abilities_list_load", abilitiesList.pointer, Context.get().pointer);
    });
  });

  describe("detect()", () => {
    it("should return abilities list", async () => {
      const {abilitiesList, driver} = createAbilitiesListFixture();
      driver.run.mockReturnValue(undefined);

      const portInfoList = new PortInfoList();

      const list = await abilitiesList.detect(portInfoList);

      expect(list).toBeInstanceOf(List);
      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_new", abilitiesList.buffer);
      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.run).toHaveBeenCalledWith(
        "gp_abilities_list_detect",
        abilitiesList.pointer,
        portInfoList.pointer,
        list.pointer,
        Context.get().pointer
      );
    });
  });

  describe("detectAsync()", () => {
    it("should return abilities list", async () => {
      const {abilitiesList, driver} = createAbilitiesListFixture();
      driver.run.mockReturnValue(undefined);

      const portInfoList = new PortInfoList();

      const list = await abilitiesList.detectAsync(portInfoList);

      expect(list).toBeInstanceOf(List);
      expect(driver.run).toHaveBeenCalledWith("gp_abilities_list_new", abilitiesList.buffer);
      expect(driver.run).toHaveBeenCalledWith("gp_port_info_list_new", portInfoList.buffer);
      expect(driver.runAsync).toHaveBeenCalledWith(
        "gp_abilities_list_detect",
        abilitiesList.pointer,
        portInfoList.pointer,
        list.pointer,
        Context.get().pointer
      );
    });
  });
});
