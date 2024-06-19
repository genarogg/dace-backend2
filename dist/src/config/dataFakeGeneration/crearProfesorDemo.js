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
const crearProfesorDemo = () => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = {
        nombre: "Ana",
        segundoNombre: "Rosa",
        apellido: "Ramos",
        segundoApellido: "Bolivar",
        cedula: "25074591",
        correo: "ana06rosa@gmail.com",
        telefono: "0412-1234567",
        contrasena: yield bcrypt_1.default.hash("demo", 10),
        esProfesor: 1,
        /* esEstudiante: 1, */
        status: "active",
    };
    yield _models_1.Usuario.create(newUser);
});
exports.default = crearProfesorDemo;
