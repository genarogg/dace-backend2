"use strict";
/* import { registrarInicio } from "./fn"; */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registroPost = void 0;
const _models_1 = require("@models");
const registroPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //{ cedula: '123456789', carrera: 'Ingeniería en Sistemas'}
    const { cedula, carrera } = req.body;
    if (!cedula || !carrera) {
        return res
            .status(200)
            .json({ mensaje: "Se necesita proporcionar la cedula" });
    }
    const usuario = yield _models_1.Usuario.findOne({ where: { cedula: cedula } });
    if (usuario) {
        return res.status(400).json({ error: "Usuario duplicado" });
    }
    _models_1.Usuario.create({
        cedula,
    })
        .then((usuario) => __awaiter(void 0, void 0, void 0, function* () {
        yield _models_1.CarrerasDelUsuario.create({
            nombreCarrera: carrera,
            usuarioId: usuario.id,
        });
        //@Bitacora
        res.status(201).json({ mensaje: "Usuario creado" });
    }))
        .catch((err) => {
        console.error("Hubo un error al crear el usuario y/o la carrera:", err);
        res
            .status(500)
            .json({ error: "Error al crear el usuario y/o la carrera" });
    });
});
exports.registroPost = registroPost;
