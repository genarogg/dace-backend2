import express from "express";

const router = express.Router();

import { registroPost } from "@controller/auth";

router.post("/register", registroPost);

export default router;
