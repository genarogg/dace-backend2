"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const notas_1 = require("@controller/notas");
router.get("/obtener", notas_1.getNotasProfesor);
router.get("/obtenerCargadas", notas_1.notasCargadasGet);
router.put("/cargar", notas_1.cargarNotasPut);
exports.default = router;
