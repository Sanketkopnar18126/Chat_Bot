import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
   {
      role: {
         type: String,
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

export const Chat = mongoose.model("chat", ChatSchema);
