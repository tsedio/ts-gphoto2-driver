import {$log} from "@tsed/logger";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {getGPhoto2Driver, GPPointerString} from "@tsed/gphoto2-core";
import {List} from "@tsed/gphoto2-driver";
import {alloc} from "../__mock__/ref-napi";

$log.stop();

jest.mock("@tsed/gphoto2-core");
jest.mock("ref-napi", () => {
  return {
    ...jest.requireActual("ref-napi"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/ref-napi")
  };
});

(GPPointerString as any).mockReturnValue(alloc("string"));

function createListFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const list = new List();

  return {driver, list};
}

describe("List", () => {
  it("should return the name", () => {
    const {list, driver} = createListFixture();

    driver.run.mockImplementation((...args: any[]) => {
      args[3].value = "name";
    });

    expect(list.getName(0)).toEqual("name");
    expect(driver.run).toHaveBeenCalledWith("gp_list_get_name", list.pointer, 0, expect.any(Object));
  });

  it("should return the value", () => {
    const {list, driver} = createListFixture();

    driver.run.mockImplementation((method, pointer, index, ref) => {
      ref.value = "value";
    });

    expect(list.getValue(0)).toEqual("value");
    expect(driver.run).toHaveBeenCalledWith("gp_list_get_value", list.pointer, 0, expect.any(Object));
  });
});
