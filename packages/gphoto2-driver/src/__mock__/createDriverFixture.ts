import {FakeContextPointer} from "./FakeBuffer";

export function createDriverFixture() {
  return {
    run: jest.fn(),
    runAsync: jest.fn(),
    gp_context_new: jest.fn().mockReturnValue(FakeContextPointer)
  };
}
