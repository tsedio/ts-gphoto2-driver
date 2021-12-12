import {$log} from "@tsed/logger";
import {createDriverFixture} from "../__mock__/createDriverFixture";
import {getGPhoto2Driver, StructCameraAbilities} from "@tsed/gphoto2-core";
import {CameraAbilities} from "./CameraAbilities";
import {FakeStruct} from "../__mock__/FakeBuffer";

$log.stop();

const cameraAbilities = new FakeStruct({
  id: "id",
  model: "model",
  library: "library",
  speed: [0, 10],
  port: 80,
  status: 0,
  operation: 0,
  file_operations: 0,
  folder_operations: 0,
  usb_vendor: 0,
  usb_product: 0,
  usb_class: 0,
  usb_subclass: 0,
  usb_protocol: 0,
  device_type: 0
});

(StructCameraAbilities as any).mockReturnValue(cameraAbilities.deref());

jest.mock("@tsed/gphoto2-core");
jest.mock("ref-napi", () => {
  return {
    ...jest.requireActual("ref-napi"),
    ...jest.requireActual("@tsed/gphoto2-driver/src/__mock__/ref-napi")
  };
});

function createCameraAbilitiesFixture() {
  const driver = createDriverFixture();
  (getGPhoto2Driver as any).mockReturnValue(driver);

  const cameraAbilities = new CameraAbilities();

  return {driver, cameraAbilities};
}

describe("CameraAbilities", () => {
  describe("model", () => {
    it("should return model name", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.model).toEqual("model");
    });
  });

  describe("speed", () => {
    it("should return speed values", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.speed).toEqual([0, 10]);
    });
  });

  describe("port", () => {
    it("should return port value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.port).toEqual(80);
    });
  });

  describe("status", () => {
    it("should return status value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.status).toEqual(0);
    });
  });

  describe("id", () => {
    it("should return id value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.id).toEqual("id");
    });
  });

  describe("library", () => {
    it("should return library value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.library).toEqual("library");
    });
  });

  describe("operation", () => {
    it("should return operation value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.operation).toEqual(0);
    });
  });

  describe("fileOperations", () => {
    it("should return fileOperations value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.fileOperations).toEqual(0);
    });
  });

  describe("folderOperations", () => {
    it("should return folderOperations value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.folderOperations).toEqual(0);
    });
  });

  describe("usbVendor", () => {
    it("should return usbVendor value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.usbVendor).toEqual(0);
    });
  });

  describe("usbProduct", () => {
    it("should return usbProduct value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.usbProduct).toEqual(0);
    });
  });

  describe("usbClass", () => {
    it("should return usbClass value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.usbClass).toEqual(0);
    });
  });

  describe("usbSubclass", () => {
    it("should return usbSubclass value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.usbSubclass).toEqual(0);
    });
  });

  describe("usbProtocol", () => {
    it("should return usbProtocol value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.usbProtocol).toEqual(0);
    });
  });

  describe("deviceType", () => {
    it("should return deviceType value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.deviceType).toEqual(0);
    });
  });

  describe("toString", () => {
    it("should return toString value", () => {
      const {cameraAbilities} = createCameraAbilitiesFixture();

      expect(cameraAbilities.toString()).toEqual("CameraAbilities{model}");
    });
  });
});
