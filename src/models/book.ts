import { model, Schema, Types } from "mongoose";
import { IAuthor } from "./author";
import { ISysTag } from "./sysTag";

export interface IBook {
  title: string;
  basename: string;
  downloaded: number;
  author: IAuthor;
  tags: ISysTag[];
}


// Set `trim: true` on every string path by default
Schema.Types.String.set('trim', true);

export const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: true,
  },
  basename: {
    type: String,
    required: true,
  },
  downloaded: {
    type: Number,
    default: 0
  },
  author: {
    type: Types.ObjectId,
    ref: "Author",
    required: true,
  },
  tags: [
    {
      type: Types.ObjectId,
      ref: "Tag",
    },
  ],
});
export const Book = model("Book", bookSchema);
