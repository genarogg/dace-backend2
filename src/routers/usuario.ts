import express from "express";

const router = express.Router();

import {
  dataUserGet,
  updateUser,
  consultarHorario,
  getBitacora,
} from "@controller/usuario";

router.get("/data", dataUserGet);

router.put("/data", updateUser);

router.get("/horario", consultarHorario);

router.get("/bitacora", getBitacora);

export default router;
