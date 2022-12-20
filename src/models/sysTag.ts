import { model, Schema } from "mongoose";

export interface ISysTag {
  tag: string;
}

Schema.Types.String.set("trim", true);
export const sysTagSchema = new Schema<ISysTag>({
  tag: {
    type: String,
    required: true,
  },
});
export const SysTag = model("Tag", sysTagSchema);
