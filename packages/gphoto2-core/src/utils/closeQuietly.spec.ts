import {$log} from "@tsed/logger";
import {closeQuietly} from "./closeQuietly";

jest.mock("@tsed/logger");

describe("closeQuietly()", () => {
  it("should close quietly the given instance", () => {
    const obj = {
      close: jest.fn()
    };
    closeQuietly(obj);

    expect(obj.close).toHaveBeenCalledWith();
  });
  it("should close quietly the given instance (and log error)", () => {
    const close = () => {
      throw new Error("error");
    };
    const obj = {
      close
    };

    closeQuietly(obj);

    expect($log.warn).toHaveBeenCalledWith("Failed to close Closeable Object:", "error");
  });
});
