import {alloc, allocCString} from "ref-napi";
import {GPPointer, GPPointerFloat, GPPointerInt, GPPointerString} from "./GPPointer";

jest.mock("ref-napi");

describe("GPPointer", () => {
  describe("GPPointer()", () => {
    it("should return a pointer", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointer<string>("string");

      expect(alloc).toHaveBeenCalledWith("string");
      expect(pointer).toEqual("alloc");
    });
    it("should return a pointer (void)", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointer<string>();

      expect(alloc).toHaveBeenCalledWith("void");
      expect(pointer).toEqual("alloc");
    });
  });

  describe("GPPointerString()", () => {
    it("should return a pointer from value", () => {
      (alloc as any).mockReturnValue("alloc");
      (allocCString as any).mockReturnValue("allocCString");

      const pointer = GPPointerString("value");

      expect(allocCString).toHaveBeenCalledWith("value");
      expect(pointer).toEqual("allocCString");
    });
    it("should return a pointer from undefined", () => {
      (alloc as any).mockReturnValue("alloc");
      (allocCString as any).mockReturnValue("allocCString");

      const pointer = GPPointerString();

      expect(alloc).toHaveBeenCalledWith("string");
      expect(pointer).toEqual("alloc");
    });
  });

  describe("GPPointerInt()", () => {
    it("should return a pointer", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointerInt(1);

      expect(alloc).toHaveBeenCalledWith("int", 1);
      expect(pointer).toEqual("alloc");
    });
    it("should return a pointer (undefined)", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointerInt();

      expect(alloc).toHaveBeenCalledWith("int", undefined);
      expect(pointer).toEqual("alloc");
    });
  });

  describe("GPPointerFloat()", () => {
    it("should return a pointer", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointerFloat(1.0);

      expect(alloc).toHaveBeenCalledWith("float", 1.0);
      expect(pointer).toEqual("alloc");
    });
    it("should return a pointer (undefined)", () => {
      (alloc as any).mockReturnValue("alloc");

      const pointer = GPPointerFloat();

      expect(alloc).toHaveBeenCalledWith("float", undefined);
      expect(pointer).toEqual("alloc");
    });
  });
});
