import { model, Schema } from "mongoose";

export interface IAuthor {
  name: string;
  alias?: string;
  biography?: string;
  photoUrl?: string;
}

// Set `trim: true` on every string path by default
Schema.Types.String.set("trim", true);

export const authorSchema = new Schema<IAuthor>({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  alias: String,
  biography: String,
  photoUrl: String,
});
export const Author = model("Author", authorSchema);
