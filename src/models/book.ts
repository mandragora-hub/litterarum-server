import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";

export interface IBaseBook {
  title: string;
  basename: string;
  downloaded?: number;
}

export interface IBook extends IBaseBook {
  author?: IAuthor;
  tags?: ISysTag[];
}

// Set `trim: true` on every string path by default
Schema.Types.String.set("trim", true);

export const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  basename: {
    type: String,
    required: true,
  },
  downloaded: {
    type: Number,
    default: 0,
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
});
export const Book = model("Book", bookSchema);
