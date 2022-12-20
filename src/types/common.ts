import { Request } from "express";

export type HttpMessageHandler = {
  code: number;
  message: string;
  success: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;
