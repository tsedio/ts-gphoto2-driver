import "@tsed/core";
import {getGPhoto2Driver} from "./GPhoto2Driver";

export * from "./modules";
export * from "./types";
export * from "./GPhoto2Driver";
export * from "./utils/GPUtils";
export * from "./utils/GPPointer";
export * from "./utils/GPPointerRef";

process.env.NODE_ENV !== "test" && getGPhoto2Driver();
