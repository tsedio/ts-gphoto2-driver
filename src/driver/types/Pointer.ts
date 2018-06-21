/**
 *
 */
export type Pointer = Buffer;

/**
 *
 */
export type PointerRef<T extends Pointer> = Buffer & {
  deref(): T;
};
