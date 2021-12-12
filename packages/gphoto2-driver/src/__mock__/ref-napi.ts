import {FakeBuffer} from "./FakeBuffer";

export function alloc(refType: any, value?: any) {
  return new FakeBuffer(refType.name || refType, value);
}

export function allocCString(value: any) {
  return new FakeBuffer("CString", value);
}
