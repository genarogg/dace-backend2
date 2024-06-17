import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { generarToken, validarCapchat, extraerInfoUser } from "@fn";

import { Usuario } from "@models";

const loginPost = async (req: Request, res: Response) => {
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

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    // El usuario no existe, envía una respuesta indicando que es incorrecto
    return res.status(400).json({ error: "Usuario no existe" });
  }

  if (!bcrypt.compareSync(contrasena, usuario.contrasena)) {
    // La contraseña no coincide, envía una respuesta indicando que es incorrecta
    return res.status(400).json({ error: "Usuario o contraseña incorrectos" });
  }

  const token = generarToken(usuario);

  //@Bitacora
  /*   registrarInicio(req, usuario.id); */

  const infoUser = extraerInfoUser(usuario);

  // Envía el token en la respuesta
  res.status(200).json({ mensaje: "inicio sesion", token, infoUser });
};

export { loginPost };
