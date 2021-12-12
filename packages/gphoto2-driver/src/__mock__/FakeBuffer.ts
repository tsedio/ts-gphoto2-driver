import {isString} from "@tsed/core";

export class FakeBuffer {
  $buffer = true;
  name: string;
  value: any;

  constructor(name: any, value?: any) {
    this.name = name;
    this.value = value;
  }

  deref() {
    return ["CString", "string"].includes(this.name) ? this.value : new FakePointer(this);
  }

  readCString() {
    return this.value;
  }
}

export class FakePointer {
  $pointer = true;

  constructor(readonly buffer: FakeBuffer) {}

  get name() {
    return this.buffer.name;
  }

  get value(): any {
    return this.buffer.value;
  }

  set value(value: any) {
    this.buffer.value = value;
  }

  ref() {
    return this.buffer;
  }

  deref() {
    return new FakePointer(this.buffer);
  }
}

export class FakeStruct extends FakeBuffer {
  #data: any = {};

  constructor(data: any) {
    super("struct");
    this.#data = data;
  }

  deref(): FakePointer {
    const itsOwnProp = (target: any, p: PropertyKey) => Reflect.has(target, p) || typeof p === "symbol";
    const data = this.#data;

    return new Proxy(new FakePointer(this), {
      get(target: any, p: PropertyKey) {
        if (itsOwnProp(target, p) && p !== "name") {
          return target[p];
        }

        if (isString(data[p])) {
          return {buffer: new FakeBuffer(`${this.name}:${p as string}`, data[p])};
        }

        return data[p];
      }
    }) as any;
  }
}

export const FakeContextPointer = new FakeBuffer("gp_context").deref();
