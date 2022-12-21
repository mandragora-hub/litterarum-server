/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction } from "express";
import Ajv from "ajv";
import httpException from "~/utils/httpException";

const ajv = new Ajv();

export default function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  return (req: any, res: any, next: NextFunction) => {
    try {
      req.body.forEach((item: any) => {
        if (!validate(item))
          throw new httpException(
            "Invalid body",
            400,
            true,
            JSON.stringify(validate.errors)
          );
      });
      return next();
    } catch (err) {
      return next(err);
    }
  };
}
