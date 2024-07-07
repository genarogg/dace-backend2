import { Request, Response } from "express";

import bcrypt from "bcrypt";

import { sendEmail } from "@email";

import {
  generarToken,
  validarCapchat,
  extraerInfoUser,
  verificarToken,
} from "@fn";

import { Usuario, BitacoraLogin } from "@models";

const resetPassPost = async (req: Request, res: Response) => {
  // { correo: "example@gmail", contrasena: "123456", captcha: "123456}
  const { correo, captcha } = req.body;

  console.log(req.body);

  const usuario = await Usuario.findOne({ where: { correo } });

  if (!usuario) {
    // El usuario no existe, envía una respuesta indicando que es incorrecto
    return res.status(400).json({ error: "Usuario no existe" });
  }

  if (usuario.status === "inactive") {
    return res.status(400).json({ error: "Usuario inactivo" });
  }

  const token = generarToken(usuario);

  //@Bitacora
  const infoUser = extraerInfoUser(usuario);
  console.log(infoUser);
  const link = `${process.env.CORS_URL}/resetPass?token=${token}`;
  console.log(link);

  sendEmail({
    email: correo,
    subject: "Reestablecer contraseña",
    templateName: "resetPassWord",
    templateData: { link },
  });

  // Envía el token en la respuesta
  res.status(200).json({
    mensaje: "Se envio un correo para restablecer la contraseña",
    token,
    infoUser,
  });
};

const resetPassPut = async (req: Request, res: Response) => {
  // { correo: "example@gmail", contrasena: "123456", captcha: "123456}
  const { email, password, token: token2 } = req.body;

  //verifica el token si es valido
  const usuarioID = verificarToken(token2);

  if (!usuarioID) {
    return res.status(400).json({ error: "Token invalido" });
  }

  const usuario = await Usuario.findByPk(usuarioID.id);

  if (!usuario) {
    // El usuario no existe, envía una respuesta indicando que es incorrecto
    return res.status(400).json({ error: "Usuario no existe" });
  }

  if (usuario.status === "inactive") {
    return res.status(400).json({ error: "Usuario inactivo" });
  }

  console.log(usuario.correo, email);
  //verifica que ese usuario corresponda al correo
  if (usuario.correo !== email) {
    return res.status(400).json({ error: "Usuario no corresponde al correo" });
  }

  await usuario.update({
    contrasena: await bcrypt.hash(password, 10),
  });

  const token = generarToken(usuario);

  //@Bitacora

  const { ip, headers } = req;
  const userAgent = headers["user-agent"];

  await BitacoraLogin.create({
    usuarioId: usuario.id,
    fecha: new Date(), // Esto se establecerá automáticamente en tu modelo
    ip,
    userAgent,
  });

  const infoUser = extraerInfoUser(usuario);

  

  // Envía el token en la respuesta
  res
    .status(200)
    .json({ mensaje: "Se a reseteado a contraseña", token, infoUser });
};

export { resetPassPost, resetPassPut };
