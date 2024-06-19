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
Object.defineProperty(exports, "__esModule", { value: true });
const _fn_1 = require("@fn");
const _models_1 = require("@models");
const getNotasProfesor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ error: "No se proporcionó token" });
        }
        const usuario = (0, _fn_1.verificarToken)(token);
        if (!usuario) {
            res.status(401).json({ error: "Token inválido" });
            return;
        }
        const { id } = usuario;
        const user = yield _models_1.Usuario.findOne({ where: { id } });
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        const notasProfesor = yield _models_1.UsuarioFn.buscarMateriasConProfesorYEstudiantes(id);
        notasProfesor.forEach((materia) => {
            materia.estudiantesInscritos = materia.estudiantesInscritos.filter((estudiante) => estudiante.nota === null);
        });
        res.json(notasProfesor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error al obtener las materias" });
    }
});
exports.default = getNotasProfesor;
