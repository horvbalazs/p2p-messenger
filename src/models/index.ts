export type Action<T, K = any> = {
  type: T;
  payload?: K;
};

export * from "./auth";
export * from "./message";
export * from "./alert";
export * from "./contact";
