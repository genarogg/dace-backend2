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
const cargarNotasPut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield _models_1.Usuario.findByPk(id);
        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" });
            return;
        }
        const { esProfesor } = user;
        if (!esProfesor) {
            res.status(401).json({ error: "No tiene permisos para esta acción" });
            return;
        }
        const data = req.body;
        console.log(data);
        for (const estudiante of data.estudiantes) {
            // Comprueba si la nota del estudiante no es null
            if (estudiante.nota !== null) {
                console.log(estudiante.id, estudiante.nota);
                yield _models_1.EstudianteMateria.update({ nota: estudiante.nota }, // Actualiza el campo nota con el valor de estudiante.nota
                {
                    where: {
                        usuarioId: estudiante.id,
                        materiaId: data.materia,
                    },
                });
            }
        }
        res.json({ message: "Notas actualizadas correctamente" });
    }
    catch (error) {
        res.status(500).json({ message: "Hubo un error al cargar las notas" });
    }
});
exports.default = cargarNotasPut;
