import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
const UserSchema = new Schema(
   {
      fullname: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
      },
      password: {
         type: String,
         required: true,
         minlength: 6,
      },
      chats: [
         {
            type: Schema.Types.ObjectId,
            ref: "Chat",
         },
      ],
   },
   { timestamps: true }
);

UserSchema.methods.generateAcessToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACESS_TOKEN_EXPIRY,
      }
   );
};

UserSchema.methods.generateRefreshToken = async function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
   );
};

export const User = mongoose.model("user", UserSchema);
