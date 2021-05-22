import {Camera, run} from "@tsed/gphoto2-driver";
import {$log} from "@tsed/logger";

const Table = require("cli-table3");

run(
  () => {
    const camera = Camera.listen();

    const table = new Table({
      head: ["Key", "Value"]
    });

    table.push(...Object.entries(camera.getAbilitiesInformation()));

    $log.info("\n" + table.toString());
  },
  {logLevel: "debug"}
);
