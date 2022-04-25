import {PlatformLoggerSettings, $log} from "@tsed/common";
import {$log as log} from "@tsed/gphoto2-core";
import {isProduction} from "../env";

log.level = "warn";

if (isProduction) {
  $log.appenders.set("stdout", {
    type: "stdout",
    levels: ["info", "debug"],
    layout: {
      type: "json"
    }
  });

  $log.appenders.set("stderr", {
    levels: ["trace", "fatal", "error", "warn"],
    type: "stderr",
    layout: {
      type: "json"
    }
  });
}

export const loggerConfig: Partial<PlatformLoggerSettings> = {
  disableRoutesSummary: isProduction
};
