export type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
export type UnPromisify<T> = T extends Promise<infer U> ? U : T;
