export type Action<T> = {
  type: T;
  payload?: any;
};

export * from "./auth";
export * from "./message";
