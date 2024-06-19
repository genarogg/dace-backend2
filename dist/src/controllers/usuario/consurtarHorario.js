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
const _models_1 = require("@models");
const _fn_1 = require("@fn");
const consultarHorario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ error: "No se proporcionó token" });
            return null;
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
        // const id = 1;
        const usuarioh = yield _models_1.UsuarioFn.buscarHorarioDelUsuario(id);
        /* console.log(JSON.stringify(usuarioh)); */
        const resultado = usuarioh.map((item) => ({
            fake: {
                id: 1,
                periodo: "2021-1",
            },
            profesor: {
                id: item.profesor.id,
                nombre: item.profesor.nombre,
                segundoNombre: item.profesor.segundoNombre,
                apellido: item.profesor.apellido,
                segundoApellido: item.profesor.segundoApellido,
                cedula: item.profesor.cedula,
                carrera: item.profesor.carrera ||
                    "INGENIERIA EN INFORMATICA - INGENIERIA DE SISTEMAS",
            },
            materia: {
                id: item.materia.id,
                nombre: item.materia.nombre,
                seccion: item.materia.seccion,
                codigo: item.materia.codigo,
            },
            horario: item.horarios.map((horario) => ({
                id: horario.id,
                dia: horario.dia,
                horaInicio: horario.horaInicio,
                horaFin: horario.horaFin,
                aula: horario.aula,
            })),
        }));
        res.status(200).json(resultado);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Hubo un error al obtener los horarios" });
    }
});
exports.default = consultarHorario;
