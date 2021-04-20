export interface StructBuffer {
  buffer: {
    readCString(offset: number): string;
  };
}
