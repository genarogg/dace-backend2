"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const _models_1 = require("@models");
const info_1 = require("./info");
const crearEstudiantes = (cantidad) => __awaiter(void 0, void 0, void 0, function* () {
    const estudiantes = yield _models_1.Usuario.count({
        where: { esEstudiante: true },
    });
    if (estudiantes >= cantidad) {
        console.log(`Ya existen ${cantidad} o más estudiantes. No se crearán más.`);
        return;
    }
    for (let i = 1; i <= cantidad; i++) {
        const { nombre, segundoNombre, apellido, segundoApellido, cedula, correo, telefono, } = (0, info_1.usuario)();
        const contrasena = yield bcrypt_1.default.hash(`contrasena${i}`, 10);
        const newUser = {
            nombre,
            segundoNombre,
            apellido,
            segundoApellido,
            cedula,
            correo: correo + "@estudiante.com",
            telefono,
            contrasena,
            esEstudiante: 1,
            status: "active",
            sede: "Central",
            carrera: "Ingeniería en Computación",
        };
        yield _models_1.Usuario.create(newUser);
    }
});
exports.default = crearEstudiantes;
