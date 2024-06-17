import express from "express";

const router = express.Router();

import { registroPost, loginPost, verificarTokenPost } from "@controller/auth";

router.post("/register", registroPost);

router.post("/login", loginPost);

router.post("/token", verificarTokenPost);

export default router;
