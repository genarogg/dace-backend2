import express from "express";

const router = express.Router();

import { registroPost } from "@controller/auth";

router.post("/", registroPost);

export default router;
