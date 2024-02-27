import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
   deleteChat,
   sendChat,
   sendChatsToUser,
} from "../controllers/chat.controller.js";
const router = Router();

router.route("/chat").post(verifyJWT, sendChat);
router.route("/chat/get_chat").get(verifyJWT, sendChatsToUser);
router.route("/chat/delete_chat").post(verifyJWT, deleteChat);

export default router;
