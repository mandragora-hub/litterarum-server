import { Express } from "express";

type MulterFiles =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[]
  | undefined;

export function isMulterFilesArray(
  files: MulterFiles
): files is Express.Multer.File[] {
  return Array.isArray(files as Express.Multer.File[]);
}
