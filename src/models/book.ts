import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";

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
  publicationDate?: string;
  isbn?: string;
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
    publicationDate: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return v.match(
            /^(3[01]|[12][0-9]|0?[1-9])(\/|-)(1[0-2]|0?[1-9])\2([0-9]{2})?[0-9]{2}$/
          );
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },
    isbn: {
      type: String,
      required: false,
      validate: {
        validator: function (v: string) {
          return v.match(/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g);
        },
        message: (props) => `${props.value} is not a valid isbn!`,
      },
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

export const Book = model("Book", bookSchema);
