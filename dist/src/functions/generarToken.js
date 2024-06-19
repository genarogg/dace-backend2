"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarToken = (usuario) => {
    const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";
    const JWTTIEMPO = process.env.JWTTIEMPO || "1h";
    const { id } = usuario;
    const token = jsonwebtoken_1.default.sign({
        id,
    }, JWTSECRETO, {
        expiresIn: JWTTIEMPO,
    });
    return token;
};
exports.default = generarToken;
