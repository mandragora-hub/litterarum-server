import { model, Schema } from "mongoose";

export interface IUser {
  name: string;
  token: string;
}

// Set `trim: true` on every string path by default
Schema.Types.String.set("trim", true);

export const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },  
  token: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
});
export const User = model("User", userSchema);
