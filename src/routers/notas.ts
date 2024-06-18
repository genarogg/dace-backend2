import express from "express";

const router = express.Router();

import {
  getNotasProfesor,
  cargarNotasPut,
  notasCargadasGet,
} from "@controller/notas";

router.get("/obtener", getNotasProfesor);

router.get("/obtenerCargadas", notasCargadasGet);

router.put("/cargar", cargarNotasPut);

export default router;
