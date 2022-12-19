import { model, Schema } from "mongoose";

export interface IBook {
  name: string;
  basename: string;
  downloaded: string;
  // authorId: string;
  // tagIds: string;

}

export const bookSchema = new Schema<IBook>();
export const Book = model("Book", bookSchema);
