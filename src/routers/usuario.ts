import express from "express";

const router = express.Router();

import {
/*   addProfesorAMateriaGet,
  addProfesorAMateriaPost,
  usersGet,
  usersUpdatePut,
  horarioGet, */
  dataUserGet
} from "@controller/usuario";

// // router.get("/add-materia-a-profesor", addProfesorAMateriaGet);

// // router.post("/add-materia-a-profesor", addProfesorAMateriaPost);

router.get("/data", dataUserGet);

// // router.put("/data", usersUpdatePut);

// // router.get("/data", usersGet);

// // router.get("/horario", horarioGet);

export default router;
