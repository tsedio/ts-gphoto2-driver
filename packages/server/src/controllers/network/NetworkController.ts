import {Controller, Inject} from "@tsed/di";
import {lookup} from "dns";
import {hostname} from "os";
import {PlatformConfiguration} from "@tsed/common";
import {Get} from "@tsed/schema";

@Controller("/network")
export class NetworkController {
  @Inject()
  configuration: PlatformConfiguration;

  @Get("/")
  getIp() {
    return new Promise((resolve, reject) => {
      const {protocol, port} = this.configuration.getBestHost() as any;

      lookup(hostname(), (err, add) => {
        if (err) {
          reject(err);
        }

        resolve(`${protocol}://${add}:${port}`);
      });
    });
  }
}
