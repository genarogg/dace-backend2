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
const _fn_1 = require("@fn");
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { email: correo, firstName: nombre, secondName: segundoNombre, firstSurname: apellido, secondSurname: segundoApellido, birthdate: fechaDeNacimiento, direction: direccion, phoneNumber: telefono, sex: genero, parroquia, etnia, oldPassword, password, } = req.body;
        if (password) {
            //comprueba si la contraseña anterior es correcta
            if (!bcrypt_1.default.compareSync(oldPassword, user.contrasena)) {
                return res
                    .status(400)
                    .json({ error: "contraseña anterior incorrectos" });
            }
            yield user.update({ contrasena: bcrypt_1.default.hashSync(password, 10) });
            return res.status(200).json({ message: "Contraseña actualizada" });
        }
        if (nombre) {
            const newData = {
                correo,
                nombre,
                segundoNombre,
                apellido,
                segundoApellido,
                fechaDeNacimiento,
                direccion,
                telefono,
                genero,
                parroquia,
                etnia,
            };
            yield user.update(newData);
            return res.status(200).json({ message: "Usuario actualizado" });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
});
exports.default = updateUser;
