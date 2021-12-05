import {join} from "path";
import {loggerConfig} from "./logger";
const {version} = require("../../package.json");
export const rootDir = join(__dirname, "..");

export const config: Partial<TsED.Configuration> = {
  version,
  rootDir,
  logger: loggerConfig
  // additional shared configuration
};
