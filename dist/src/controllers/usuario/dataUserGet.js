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
const dataUserGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        let birthdate = "";
        if ((user === null || user === void 0 ? void 0 : user.fechaDeNacimiento) instanceof Date) {
            birthdate = user.fechaDeNacimiento.toISOString().split("T")[0];
        }
        const data = {
            email: user === null || user === void 0 ? void 0 : user.correo,
            firstName: user === null || user === void 0 ? void 0 : user.nombre,
            secondName: user === null || user === void 0 ? void 0 : user.segundoNombre,
            firstSurname: user === null || user === void 0 ? void 0 : user.apellido,
            secondSurname: user === null || user === void 0 ? void 0 : user.segundoApellido,
            birthdate,
            direction: user === null || user === void 0 ? void 0 : user.direccion,
            phoneNumber: user === null || user === void 0 ? void 0 : user.telefono,
            sex: user === null || user === void 0 ? void 0 : user.genero,
            parroquia: user === null || user === void 0 ? void 0 : user.parroquia,
            etnia: "",
        };
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});
exports.default = dataUserGet;
