"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notasCargadasGet = exports.cargarNotasPut = exports.getNotasProfesor = void 0;
const getNotasProfesor_1 = __importDefault(require("./notas/getNotasProfesor"));
exports.getNotasProfesor = getNotasProfesor_1.default;
const cargarNotasPut_1 = __importDefault(require("./notas/cargarNotasPut"));
exports.cargarNotasPut = cargarNotasPut_1.default;
const notasCargadasGet_1 = __importDefault(require("./notas/notasCargadasGet"));
exports.notasCargadasGet = notasCargadasGet_1.default;
