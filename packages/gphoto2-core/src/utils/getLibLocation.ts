import {existsSync} from "fs";
import os from "os";

const POSSIBLE_LIB_LOCATIONS = [
  os.arch() === "x64" && "/usr/local/lib/libgphoto2.dylib",
  os.arch() === "x64" && "/usr/local/homebrew/lib/libgphoto2.dylib",
  os.arch() === "arm64" && "/opt/homebrew/lib/libgphoto2.dylib"
].filter(Boolean) as string[];

export function getLibLocation() {
  return POSSIBLE_LIB_LOCATIONS.find((path) => existsSync(path)) || "libgphoto2";
}
