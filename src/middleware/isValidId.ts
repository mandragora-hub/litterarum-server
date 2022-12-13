import { RequestHandler } from "express";

const isValidId: RequestHandler<{ id: string }> = (req, _res, next) => {
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return next("Invalid id.");
  return next();
};

export default isValidId;
