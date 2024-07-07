import express from "express";

const router = express.Router();

import {
  registroPost,
  loginPost,
  verificarTokenPost,
  resetPassPost,
  resetPassPut
} from "@controller/auth";

router.put("/active", registroPost);

router.post("/login", loginPost);

router.post("/token", verificarTokenPost);

router.post("/sendResetPass", resetPassPost);

router.put("/resetPass", resetPassPut);

export default router;
