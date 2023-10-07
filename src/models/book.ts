import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";
import slugify from "~/utils/lib/slugify";

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
  publicationDate?: string; // 431-213 BC, 1982
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
  slug: string; // A slug is a human-readable, unique identifier, used to identify a resource instead of a less human-readable identifier like an id.
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
    slug: {
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

bookSchema.pre('validate', function(next) {
  this.slug = slugify(this.title);
  next();
});

export const Book = model("Book", bookSchema);
