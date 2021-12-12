import {GPPointerRef} from "./GPPointer";

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
});
