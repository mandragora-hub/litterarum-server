import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";
import convertToAbsoluteUrl from "~/utils/lib/convertToAbsoluteUrl";

export interface IBaseBook {
  title: string;
  description?: string;
  downloaded: number;
  views: number;
  coverUrl?: string;
  readTime?: number; // ?note: time in milliseconds
  wordCount?: number;
  pages?: number;
  pdfFile?: string;
  ePubFile?: string;
  downloadPdfLink?: string; // remove me
  downloadEPubLink?: string; // remove me
}

export interface Metadata {
  title: string;
  author: string;
  subject: string;
  creator: string;
  keywords: string;
  producer: string;
  creationDate: Date;
  modificationDate: Date;
}

export interface IBook extends IBaseBook {
  author?: IAuthor;
  tags?: ISysTag[];
  metadata?: Partial<Metadata>;
}

// Set `trim: true` on every string path by default
Schema.Types.String.set("trim", true);

export const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
    },
    downloaded: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    coverUrl: String,
    readTime: Number,
    wordCount: Number,
    pages: Number,
    pdfFile: {
      type: String,
      required: false,
      unique: true,
    },
    ePubFile: {
      type: String,
      required: false,
      unique: true,
    },
    downloadPdfLink: {
      type: String,
      required: false,
      unique: true,
    },
    downloadEPubLink: {
      type: String,
      required: false,
      unique: true,
    },
    metadata: {
      title: String,
      author: String,
      subject: String,
      creator: String,
      keywords: String,
      producer: String,
      creationDate: Date,
      modificationDate: Date,
    },
    author: {
      type: Types.ObjectId,
      ref: "Author",
    },
    tags: [
      {
        type: Types.ObjectId,
        index: true,
        ref: "Tag",
      },
    ],
  },
  { timestamps: true }
);

bookSchema.post("findOne", (result: IBook) => {
  if (result.downloadEPubLink)
    result.downloadEPubLink = convertToAbsoluteUrl(result.downloadEPubLink);
  if (result.downloadPdfLink)
    result.downloadPdfLink = convertToAbsoluteUrl(result.downloadPdfLink);
});

bookSchema.post("find", (result: IBook[]) => {
  result.forEach((el) => {
    if (el.downloadEPubLink)
      el.downloadEPubLink = convertToAbsoluteUrl(el.downloadEPubLink);
    if (el.downloadPdfLink)
      el.downloadPdfLink = convertToAbsoluteUrl(el.downloadPdfLink);
  });
});

export const Book = model("Book", bookSchema);
