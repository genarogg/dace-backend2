"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usuario_1 = require("@controller/usuario");
// // router.get("/add-materia-a-profesor", addProfesorAMateriaGet);
// // router.post("/add-materia-a-profesor", addProfesorAMateriaPost);
router.get("/data", usuario_1.dataUserGet);
router.put("/data", usuario_1.updateUser);
router.get("/horario", usuario_1.consultarHorario);
router.get("/bitacora", usuario_1.getBitacora);
// // router.get("/horario", horarioGet);
exports.default = router;
