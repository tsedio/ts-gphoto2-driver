import {existsSync} from "fs";

const POSSIBLE_LIB_LOCATIONS = ["/usr/local/lib/libgphoto2.dylib"];

export function getLibLocation() {
  return POSSIBLE_LIB_LOCATIONS.find((path) => existsSync(path)) || "libgphoto2";
}
