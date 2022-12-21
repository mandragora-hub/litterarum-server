/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import { Request, Response, NextFunction } from "express";
import HttpException from "./httpException";
import logger from "./helpers/logger";
import mongoose from "mongoose";
import Api404Error from "./api404Error";
import ValidationError from "./validationError";
import httpMessage from "~/config/messages";

function middleware(err, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message);

  const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpMessage;
  if (isCastError(err) || isValidationError(err))
    return res.status(BAD_REQUEST.code).send(BAD_REQUEST);

  if (isApi404Error(err))
    return res
      .status(err.statusCode)
      .send({ code: err.statusCode, status: "FAILED", message: err.message });

  if (isHttpException(err))
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

function isHttpException(error) {
  return error instanceof HttpException;
}

function isValidationError(error) {
  return error instanceof mongoose.Error;
}

// function isValidationError(error) {
//   return error instanceof ValidationError;
// }

export default {
  middleware,
  isOperationalError,
  isCastError,
  isApi404Error,
};
