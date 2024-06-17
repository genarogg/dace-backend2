import express from "express";

const router = express.Router();

import { registroPost,loginPost/* , verificarToken */ } from "@controller/auth";

router.post("/register", registroPost);

router.post("/login", loginPost);

/* router.post("/token", verificarToken); */

export default router;












