import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";

export interface IBaseBook {
  title: string;
  basename: string;
  downloaded: number;
  views: number;
  coverUrl?: string;
  readTime?: number; // ?note: time in milliseconds
  wordCount?: number;
  pages?: number;
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
    basename: {
      type: String,
      required: true,
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
export const Book = model("Book", bookSchema);
