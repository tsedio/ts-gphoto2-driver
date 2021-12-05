import {catchError} from "@tsed/core";
import {$log} from "@tsed/logger";
import {getGPhoto2Driver} from "../GPhoto2Driver";
import {GPCodes} from "../types/GPCodes";
import {checkCode, checkQuietly} from "./checkCode";

jest.mock("../GPhoto2Driver");
jest.mock("@tsed/logger");

describe("GPUtils", () => {
  describe("checkCode()", () => {
    it("should throw an error", () => {
      (getGPhoto2Driver as any).mockReturnValue({
        gp_port_result_as_string: jest.fn().mockReturnValue("Error GP")
      });

      const error = catchError(() => checkCode(GPCodes.GP_ERROR_BAD_PARAMETERS, "method"));
      expect(error?.message).toEqual("method returned -2: GP_ERROR_BAD_PARAMETERS > Error GP");
    });
    it("should fail silently", () => {
      (getGPhoto2Driver as any).mockReturnValue({
        gp_port_result_as_string: jest.fn().mockReturnValue("Error GP")
      });

      checkQuietly(GPCodes.GP_ERROR_BAD_PARAMETERS, "method");
      expect($log.warn).toHaveBeenCalledWith("method returned -2: GP_ERROR_BAD_PARAMETERS > Error GP");
    });
    it("should return the value", () => {
      (getGPhoto2Driver as any).mockReturnValue({
        gp_port_result_as_string: jest.fn()
      });

      const value = checkCode(2, "method");

      expect(value).toEqual(2);
    });
  });
});
