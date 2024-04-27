import { model, Schema, Types } from "mongoose";
import { IBook } from "./book";
import slugify from "~/utils/lib/slugify";

export interface ICollection {
  name: string;
  slug: string; // A slug is a human-readable, unique identifier, used to identify a resource instead of a less human-readable identifier like an id.
  description?: string;
  books: IBook[];
  views: number;
  coverUrl?: string;
}

// Set `trim: true` on every string path by default
Schema.Types.String.set("trim", true);

export const collectionSchema = new Schema<ICollection>(
  {
    name: {
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
    views: {
      type: Number,
      default: 0,
    },
    coverUrl: String,
    books: [
      {
        type: Types.ObjectId,
        index: true,
        ref: "Book",
      },
    ],
  },
  { timestamps: true },
);

collectionSchema.pre("validate", function (next) {
  this.slug = slugify(this.name);
  next();
});

export const Collection = model("Collection", collectionSchema);
