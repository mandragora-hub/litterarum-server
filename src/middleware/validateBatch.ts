/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction } from "express";
import Ajv from "ajv";
import validationError from "~/utils/validationError";

const ajv = new Ajv();

export default function validateBody(schema: object) {
  const validate = ajv.compile(schema);
  return (req: any, _res: any, next: NextFunction) => {
    try {
      req.body.forEach((item: any) => {
        if (!validate(item))
          throw new validationError(JSON.stringify(validate.errors));
      });
      
      return next();
    } catch (err) {
      return next(err);
    }
  };
}
