import {$log} from "@tsed/logger";
import SegfaultHandler from "segfault-handler";
import {closeAll} from "../components/Garbage";

let configuredSegfaultPath = false;

export interface RunOptions {
  segfaultPath?: string;
  logLevel?: "info" | "debug" | "warn" | "error" | "off";
}

/**
 * Run camera script and clean all allocated resource when the script is done.
 * @param cb
 * @param options
 */
export async function run(cb: any, options: RunOptions = {}) {
  const {segfaultPath = "crash.log", logLevel = "info"} = options;

  $log.level = logLevel;

  if (!configuredSegfaultPath) {
    SegfaultHandler.registerHandler(segfaultPath);
    configuredSegfaultPath = true;
  }
  try {
    await cb();
  } catch (er) {
    $log.error(er.message, er.stack);
  } finally {
    closeAll();
  }
}
