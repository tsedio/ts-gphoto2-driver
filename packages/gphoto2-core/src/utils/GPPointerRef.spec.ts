import {getGPhoto2Driver} from "../GPhoto2Driver";
import {GPPointerRef, GPPointerRefOf} from "./GPPointerRef";
import {checkCode} from "./GPUtils";

jest.mock("../GPhoto2Driver");
jest.mock("./GPUtils");

describe("GPPointerRef", () => {
  describe("GPPointerRef()", () => {
    it("should return a pointerRef", () => {
      const ref = GPPointerRef("string");

      expect(ref.type?.name).toEqual("CString*");
    });
    it("should return a pointerRef (void)", () => {
      const ref = GPPointerRef();

      expect(ref.type?.name).toEqual("void*");
    });
  });
  describe("GPPointerRefOf()", () => {
    it("should a pointer of", () => {
      const driver = {
        method: jest.fn().mockReturnValue(1)
      };

      (getGPhoto2Driver as any).mockReturnValue(driver);

      const result = GPPointerRefOf("method");

      expect(result.type).toEqual({
        indirection: 2,
        name: "void*"
      });
      expect(checkCode).toHaveBeenCalledWith(1);
    });
  });
});
