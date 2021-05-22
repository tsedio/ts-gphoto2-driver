import {pointerToString} from "./pointerToString";
import {readCString} from "ref-napi";
jest.mock("ref-napi");

describe("pointerToString()", () => {
  it("should transform point to a string", () => {
    pointerToString({} as any);
    expect(readCString).toHaveBeenCalledWith({}, 0);
  });
});
