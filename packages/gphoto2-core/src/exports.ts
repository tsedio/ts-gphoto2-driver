import "@tsed/core";
import {getGPhoto2Driver} from "./GPhoto2Driver";
export {$log} from "@tsed/logger";

// export * from "./napi/exports";
// export * from "./modules";
// export * from "./types";
// export * from "./GPhoto2Driver";
// export * from "./utils/GPUtils";
// export * from "./utils/GPPointer";

process.env.NODE_ENV !== "test" && getGPhoto2Driver();
