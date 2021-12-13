import {FakeBuffer} from "./FakeBuffer";

export function GPPointer(refType: any, value?: any) {
  return new FakeBuffer(refType.name || refType, value);
}

export const GPPointerString = jest.fn();
export const getGPhoto2Driver = jest.fn();
