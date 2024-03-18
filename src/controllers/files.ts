import { Request, Response, NextFunction } from "express";
import multer from "multer";
import serverResponses from "~/utils/helpers/responses";
import messages from "~/config/messages";
import Api404Error from "~/utils/api404Error";
import occ from "~/utils/OwncloudClient";
import { isMulterFilesArray } from "~/utils/typeGuard";

const getAllFiles = (req: Request, res: Response, next: NextFunction) => {
  occ
    .getDirectoryContents()
    .then((files) => {
      serverResponses.sendSuccess(res, messages.SUCCESSFUL, files);
    })
    .catch((err) => {
      next(err);
    });
};

const stat = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id: path } = req.params;
  try {
    const exists = await occ.exists(path);
    if (!exists)
      throw new Api404Error(`Files with id: ${req.params.id} not found.`);
  } catch (err) {
    return next(err);
  }

  const stat = await occ.stat(path);
  serverResponses.sendSuccess(res, messages.SUCCESSFUL, stat);
};

const download = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  const { id: path } = req.params;
  try {
    const exists = await occ.exists(path);
    if (!exists)
      throw new Api404Error(`Files with id: ${req.params.id} not found.`);
  } catch (err) {
    return next(err);
  }

  // const stat = await occ.stat(path) as FileStat
  // res.attachment(stat.basename);
  occ.createReadStream(path).pipe(res);

  // !TODO : Handle error stream creation
  //   fileStream.on('error', err => {
  //   next(err);
  // });
};

const handleUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const memoryStorage = multer.memoryStorage();
  const multerWrapper = multer({ storage: memoryStorage }).array("files");
  multerWrapper(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.error(err);
      return serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    } else if (err) {
      // An unknown error occurred when uploading.
      console.error(err);
      return serverResponses.sendError(res, messages.INTERNAL_SERVER_ERROR);
    }

    if (!isMulterFilesArray(req.files)) return;
    for (const file of req.files) {
      const filename = file.originalname
        .toLowerCase()
        .replace(/[0-9]/g, "") // remove numerical characters
        .trim() // remove end and start spaces
        .replace(/ /g, "-"); //replace every space with hyphens
      const result = await occ.putFileContents(filename, file.buffer);
      if (!result) console.error(`Error on creating file: ${filename}`);
    }
  });

  serverResponses.sendSuccess(res, messages.SUCCESSFUL);
};

export { getAllFiles, stat, download, handleUpload };
