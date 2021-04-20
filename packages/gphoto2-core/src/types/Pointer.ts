/**
 * In C => *Type
 */
export type PointerOf<T> = Buffer & {
  deref(): T;
};

/**
 * In C => **Type
 */
export type PointerRef<T> = PointerOf<PointerOf<T>>;
