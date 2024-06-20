import express from "express";

const router = express.Router();

import { getListadoProfesor } from "@controller/listado";

router.get("/obtener", getListadoProfesor);

export default router;
