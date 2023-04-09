import { Request } from "express";

export type HttpMessageHandler = {
  code: number;
  message: string;
  success: boolean;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestBody<T> = Request<{}, {}, T>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type RequestQuery<T> = Request<{}, {}, {}, T>;

export type KeysetPagination = Partial<{
  q: string;
  page: number;
  limit: number;
  sort: string;
  order: "desc" | "asc";
}>;

export type TypeFile = "pdf" | "epub";
