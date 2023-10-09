import { Request, Response, NextFunction } from "express";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import occ from "~/utils/OwncloudClient";

const getAllFiles = (req: Request, res: Response, next: NextFunction) => {
  occ.getDirectoryContents()
    .then((files) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, files);
    })
    .catch((err) => {
      next(err);
    });
};

const stat = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id: path } = req.params;
  try {
    const exists = await occ.exists(path);
    if (!exists) throw new Api404Error(`Files with id: ${req.params.id} not found.`);
  } catch (err) { return next(err); }

  const stat = await occ.stat(path)
  serverResponses.sendSuccess(res, messages.SUCCESSFUL, stat);
};

const download = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  const { id: path } = req.params;
  try {
    const exists = await occ.exists(path);
    if (!exists) throw new Api404Error(`Files with id: ${req.params.id} not found.`);
  } catch (err) { return next(err); }

  // const stat = await occ.stat(path) as FileStat
  // res.attachment(stat.basename);
  occ.createReadStream(path).pipe(res);

  // !TODO : Handle error stream creation
  //   fileStream.on('error', err => {
  //   next(err);
  // });
};

export { getAllFiles, stat, download };
