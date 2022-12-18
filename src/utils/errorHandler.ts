/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import { Request, Response, NextFunction } from "express";
import HttpException from "./httpException";
import logger from "./helpers/logger";
import mongoose from "mongoose";
import Api404Error from "./api404Error";
import httpMessage from "~/config/messages";

function middleware(err, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message);

  const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpMessage;
  if (isCastError(err)) return res.status(BAD_REQUEST.code).send(BAD_REQUEST);

  if (isApi404Error(err))
    return res
      .status(err.statusCode)
      .send({ code: err.statusCode, status: "FAILED", message: err.message });

  return res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR);
}

function isOperationalError(error) {
  if (error instanceof HttpException) {
    return error.isOperational;
  }
  return false;
}

function isCastError(error) {
  return error instanceof mongoose.Error.CastError;
}

function isApi404Error(error) {
  return error instanceof Api404Error;
}

export default {
  middleware,
  isOperationalError,
  isCastError,
  isApi404Error,
};
