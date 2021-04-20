import {CameraFile} from "./CameraFile";

export class CameraFileFromFd extends CameraFile {
  constructor(fd: number) {
    super({openMethod: "new_from_fd"}, fd);
  }

  close() {
    return this;
  }
}
