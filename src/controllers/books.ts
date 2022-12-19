import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";

const getAll = (req: Request, res: Response, next: NextFunction) => {
  
  occ.getDirectoryContents()
    .then((files) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, files);
    })
    .catch((err) => {
      next(err);
    });
};

const stat = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const exists = await occ.exists(path);
    if (!exists) throw new Api404Error(`Files with id: ${req.params.id} not found.`);
  } catch (err) { return next(err); }

  const stat = await occ.stat(path)
  serverResponses.sendSuccess(res, messages.SUCCESSFUL, stat);
};

const createBooks = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {};

const remove = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {}
const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {}
// const update = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {}


export { getAllFiles, stat, download };
