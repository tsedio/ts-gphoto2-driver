import {Closeable} from "@tsed/gphoto2-core";
import {addInstance, closeAll, removeInstance} from "./Garbage";

jest.mock("@tsed/logger");

describe("Garbage", () => {
  it("should add instance then clean it", () => {
    class MyClass implements Closeable {
      close(): this {
        removeInstance(this);
        return this;
      }
    }

    const instance = new MyClass();
    jest.spyOn(instance, "close");

    addInstance(instance);
    closeAll();

    expect(instance.close).toHaveBeenCalledWith();
  });
});
