export interface IStructBuffer {
  buffer: {
    readCString(offset: number): string;
  };
}
