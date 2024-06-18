import express from "express";

const router = express.Router();

import { getNotasProfesor , cargarNotasPut } from "@controller/notas";

router.get("/obtener", getNotasProfesor);

router.put("/cargar", cargarNotasPut);

export default router;
