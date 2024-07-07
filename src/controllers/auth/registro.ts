import { generarToken, validarCapchat, extraerInfoUser } from "@fn";

import { sendEmail } from "@email";

import bcrypt from "bcrypt";
const { CORREO_ADMIN } = process.env;

import { Request, Response } from "express";

import { Usuario, BitacoraLogin } from "@models";

const registroPost = async (req: Request, res: Response) => {
  //{ cedula: '123456789', carrera: 'Ingeniería en Sistemas'}

  console.log(req.body);
  const { cedula, correo, contrasena, captcha } = req.body;

  if (!cedula || !correo || !contrasena) {
    return res
      .status(200)
      .json({ mensaje: "Se necesita proporcionar la cedula" });
  }

  const usuario = await Usuario.findOne({ where: { cedula: cedula } });

  if (!usuario) {
    return res.status(400).json({ error: "Usuario no existe" });
  }

  if (usuario?.status === "active") {
    return res.status(400).json({ error: "Su usuario ya fue activado" });
  }

  if (usuario?.status === "inactive") {
    // activar usuario

    await usuario
      .update({
        status: "active",
        correo,
        contrasena: await bcrypt.hash(contrasena, 10),
      })
      .then(async (usuario) => {
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

        sendEmail({
          email: correo,
          subject: "Reestablecer contraseña",
          templateName: "bienvenida",
          templateData: {},
        });

        // Envía el token en la respuesta
        res.status(200).json({ mensaje: "Usuario activado", token, infoUser });
      });
  }
};

export { registroPost };
