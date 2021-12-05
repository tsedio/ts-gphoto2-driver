import {Property, Required} from "@tsed/schema";

export class CameraAbilitiesModel {
  @Required()
  id: string;

  @Required()
  model: string;

  @Required()
  port: string;

  @Required()
  status: string;

  @Property()
  library: string;

  @Property()
  operation: string;

  @Property()
  fileOperations: string;

  @Property()
  folderOperations: string;

  @Property()
  usbVendor: string;

  @Property()
  usbProduct: string;

  @Property()
  usbClass: string;

  @Property()
  usbSubclass: string;

  @Property()
  deviceType: string;

  @Property()
  speed: string[];
}
