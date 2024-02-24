import { asynchHandler } from "../utills/asynchHandler.js";
import { apiError } from "../utills/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import bcrypt from "bcryptjs";
import { User } from "../models/user.models.js";

// Generate acess and refresj Token
const generateAcessAndRefreshToken = async (userId) => {
   const user = await User.findById(userId);
   // console.log("UserGenerate Accesss and ref:", user);
   const acessToken = await user.generateAcessToken();
   // console.log("accesssToKEN", acessToken);
   const refreshToken = await user.generateRefreshToken();
   // console.log("RefreshToKEN", refreshToken);

   user.refreshToken = refreshToken;
   await user.save({ validateBeforeSave: false });
   return { acessToken, refreshToken };
};
const registerUser = asynchHandler(async (req, res) => {
   const { fullname, email, password } = req.body;

   if (
      [fullname, email, password].some((fields) => fields.trim() === undefined)
   ) {
      throw new apiError(404, "You have to fill all detais");
   }
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);

   const existedUser = await User.findOne({
      $or: [{ email, fullname }],
   });
   if (existedUser) {
      throw new apiError(404, "User alredy exist");
   }

   const user = await User.create({
      fullname: fullname,
      password: hashedPassword,
      email: email,
   });

   if (!user) {
      throw new apiError(404, "Something error occur to create User");
   }

   const userWithoutPassword = await User.findById(user?._id).select(
      "-password"
   );

   return res
      .status(200)
      .json(
         new apiResponse(200, userWithoutPassword, "User Successfully Created")
      );
});

// LoginUser
const logIn = asynchHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({
      email: email,
   });
   if (!user) {
      throw new apiError(404, "User does not exist");
   }

   const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
   );
   if (!isPasswordCorrect) {
      throw new apiError(404, "Incorrect Password");
   }

   const { acessToken, refreshToken } = await generateAcessAndRefreshToken(
      user?._id
   );
   const loginUser = await User.findById(user?._id).select(
      "-password -refreshToken"
   );

   const options = {
      httpOnly: true,
      secure: true,
   };
   return res
      .status(200)
      .cookie("acessToken", acessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
         new apiResponse(200, { user: loginUser }, "User successfully login")
      );
});

// LogOut
const logOut = asynchHandler(async (req, res) => {
   const user = await User.findByIdAndUpdate(
      req?.user?._id,
      {
         refreshToken: undefined,
      },
      {
         new: true,
      }
   );
   const options = {
      httpOnly: true,
      secure: true,
   };
   return res
      .status(200)
      .clearCookie("acessToken", options)
      .clearCookie("refreshToken", options)
      .json(new apiResponse(200, {}, "User Successfully LogOut"));
});

export { registerUser, logIn, logOut };
