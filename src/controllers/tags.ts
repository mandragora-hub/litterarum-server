import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import { ISysTag, SysTag } from "~/models/sysTag";

const findAll = (req: Request, res: Response, next: NextFunction) => {
  SysTag.find({}, { __v: 0 })
    .then((tags) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, tags);
    })
    .catch((err) => {
      next(err);
    });
};

const create = async (
  req: Request<{ id: string }, object, ISysTag>,
  res: Response,
  next: NextFunction
) => {
  const newTag = req.body;
  const tags = new SysTag({ ...newTag });
  tags
    .save()
    .then((result) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
    })
    .catch((err) => {
      next(err);
    });
};

const findOne = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const tags = await SysTag.findById(req.params.id);
    if (!tags) {
      throw new Api404Error(`tags with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, tags);
  } catch (err) {
    next(err);
  }
};

const remove = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await SysTag.deleteOne({ _id: req.params.id });
    if (result.deletedCount == 0) {
      throw new Api404Error(`tags with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, result);
  } catch (err) {
    next(err);
  }
};

const update = async (
  req: Request<{ id: string }, object, ISysTag>,
  res: Response,
  next: NextFunction
) => {
  try {
    const newTag = req.body;
    const updatedTag = await SysTag.findOneAndUpdate(
      { _id: req.params.id },
      newTag,
      {
        new: true,
      }
    );
    if (!updatedTag) {
      throw new Api404Error(`tags with id: ${req.params.id} not found.`);
    }
    serverResponses.sendSuccess(res, messages.SUCCESSFUL, updatedTag);
  } catch (err) {
    next(err);
  }
};
export { findAll, create, findOne, remove, update };
