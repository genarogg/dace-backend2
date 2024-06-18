import express from "express";

const router = express.Router();

import {
  /*   addProfesorAMateriaGet,
  addProfesorAMateriaPost,
  usersGet,
  usersUpdatePut,
  horarioGet, */
  dataUserGet,
  updateUser,
  consultarHorario,
  getBitacora
} from "@controller/usuario";

// // router.get("/add-materia-a-profesor", addProfesorAMateriaGet);

// // router.post("/add-materia-a-profesor", addProfesorAMateriaPost);

router.get("/data", dataUserGet);

router.put("/data", updateUser);

router.get("/horario", consultarHorario);

router.get("/bitacora", getBitacora);

// // router.get("/horario", horarioGet);

export default router;
