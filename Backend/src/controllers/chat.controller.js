import { asynchHandler } from "../utills/asynchHandler.js";
import { apiError } from "../utills/apiError.js";
import { apiResponse } from "../utills/apiResponse.js";
import { User } from "../models/user.models.js";
import OpenAI from "openai";
import { configureOpenAI } from "../config_openai/config_openai.js";

const sendChat = asynchHandler(async (req, res) => {
   try {
      const { message } = req.body;
      console.log("msg", message);
      console.log("req", req.body);
      if ([message].some((fields) => fields?.trim() === undefined)) {
         throw new apiError(404, "You have to fill all details");
      }
      const user = await User.findById(req?.user?._id);
      if (!user) {
         throw new apiError(404, "User Not Exist");
      }

      const chats = user.chats.map(({ role, content }) => ({
         role,
         content,
      }));
      chats.push({ content: message, role: "user" });

      const config = configureOpenAI();
      const openai = new OpenAI({
         apiKey: config.apiKey,
      });

      // Assuming 'openai.Completions.create' is still valid
      const chatResponse = await openai.chat.completions.create({
         model: "gpt-3.5-turbo",
         messages: chats,
      });

      user.chats.push(chatResponse.choices[0].text);
      await user.save();

      return res
         .status(200)
         .json(
            new apiResponse(
               200,
               { chats: user.chats },
               "Successfully got the chat"
            )
         );
   } catch (error) {
      console.log("Error at chat controller", error);
      res.status(500).json(new apiError(500, "Internal Server Error"));
   }
});
const sendChatsToUser = asynchHandler(async (req, res) => {
   try {
      //user token check
      const user = await User.findById(res?.user?._id);
      if (!user) {
         throw new apiError(404, "User Not Exist");
      }

      return res
         .status(200)
         .json(new apiResponse(200, user, "Successfully got the chat"));
   } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
   }
});

const deleteChat = asynchHandler(async (req, res) => {
   try {
      //user token check
      const user = await User.findById(res?.user?._id);
      if (!user) {
         throw new apiError(404, "User Not Exist");
      }

      //@ts-ignore
      user.chats = [];
      await user.save();
      return res
         .status(200)
         .json(new apiResponse(200, user, "Successfully got the chat"));
   } catch (error) {
      console.log(error);
      return res.status(200).json({ message: "ERROR", cause: error.message });
   }
});

export { sendChat, sendChatsToUser, deleteChat };
