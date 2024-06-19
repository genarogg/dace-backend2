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
exports.loginPost = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const _fn_1 = require("@fn");
const _models_1 = require("@models");
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // { correo: "example@gmail", contrasena: "123456", captcha: "123456}
    const { correo, contrasena, captcha } = req.body;
    //comentado para pruebas
    // if (!correo || !contrasena || !captcha) {
    //   return res.status(400).json({ error: "Faltan campos obligatorios." });
    // }
    // const captchaResponse = await validarCapchat(captcha);
    // if (!captchaResponse) {
    //   return res.status(400).json({ error: "Captcha no válido." });
    // }
    const usuario = yield _models_1.Usuario.findOne({ where: { correo } });
    if (!usuario) {
        // El usuario no existe, envía una respuesta indicando que es incorrecto
        return res.status(400).json({ error: "Usuario no existe" });
    }
    if (!bcrypt_1.default.compareSync(contrasena, usuario.contrasena)) {
        // La contraseña no coincide, envía una respuesta indicando que es incorrecta
        return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
    }
    const token = (0, _fn_1.generarToken)(usuario);
    //@Bitacora
    const { ip, headers } = req;
    const userAgent = headers["user-agent"];
    yield _models_1.BitacoraLogin.create({
        usuarioId: usuario.id,
        fecha: new Date(), // Esto se establecerá automáticamente en tu modelo
        ip,
        userAgent,
    });
    const infoUser = (0, _fn_1.extraerInfoUser)(usuario);
    // Envía el token en la respuesta
    res.status(200).json({ mensaje: "inicio sesion", token, infoUser });
});
exports.loginPost = loginPost;
