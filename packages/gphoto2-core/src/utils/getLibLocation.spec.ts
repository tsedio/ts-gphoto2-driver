import {existsSync} from "fs";
import {getLibLocation} from "./getLibLocation";

jest.mock("fs");

describe("getLibLocation()", () => {
  it("should return the expected lib location", () => {
    (existsSync as any).mockReturnValue(true);

    const path = getLibLocation();
    expect(path).toEqual("/usr/local/lib/libgphoto2.dylib");
  });
  it("should return the expected lib symlink", () => {
    (existsSync as any).mockReturnValue(false);

    const path = getLibLocation();
    expect(path).toEqual("libgphoto2");
  });
});
