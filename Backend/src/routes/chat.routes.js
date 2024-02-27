import { Router } from "express";

const router = Router();

router.route("/chat").post(sendChat);
export default router;
