/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck

import { Request, Response, NextFunction } from "express";
import HttpException from "./httpException";
import logger from "./helpers/logger";
import mongoose from "mongoose";
import httpMessage from "~/config/messages";

function middleware(err, _req: Request, res: Response, _next: NextFunction) {
  logger.error(err.message);
  const { BAD_REQUEST, INTERNAL_SERVER_ERROR } = httpMessage;

  try {
    if (isCastError(err)) return res.status(BAD_REQUEST.code).send(BAD_REQUEST);
    if (isValidationError(err)) return handleMongooseValidationError(res, err);

    if (err.name == "Api404Error") handleHttpException(res, err);
    if (err.name == "Api400Error") handleHttpException(res, err);
    if (err.name == "ValidationError") handleHttpException(res, err);
    if (err.name == "HttpException") handleHttpException(res, err);

    if (err.code && err.code == 11000) handleDuplicateKeyError(res, err);
  } catch {
    return res.status(INTERNAL_SERVER_ERROR.code).send(INTERNAL_SERVER_ERROR);
  }
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

function isValidationError(error) {
  return error instanceof mongoose.Error.ValidationError;
}

function handleHttpException(res: Response, err: HttpException) {
  return res
    .status(err.statusCode)
    .send({ code: err.statusCode, status: "FAILED", message: err.message });
}

function handleDuplicateKeyError(res: Response, err: HttpException) {
  const { BAD_REQUEST } = httpMessage;
  return res
    .status(BAD_REQUEST.code)
    .send({ code: BAD_REQUEST.code, status: "FAILED", message: err.message });
}

function handleMongooseValidationError(
  res: Response,
  err: mongoose.Error.ValidationError
) {
  const { BAD_REQUEST } = httpMessage;
  return res
    .status(BAD_REQUEST.code)
    .send({ code: BAD_REQUEST.code, status: "FAILED", message: err.message });
}

export default {
  middleware,
  isOperationalError,
  isCastError,
};
