/* import { registrarInicio } from "./fn"; */

import { Request, Response } from "express";

import { Usuario } from "@models";

const registroPost = async (req: Request, res: Response) => {
  const { cedula } = req.body;

  if (!cedula) {
    return res
      .status(200)
      .json({ mensaje: "Se necesita proporcionar la cedula" });
  }

  const usuario = await Usuario.findOne({ where: { cedula: cedula } });

  if (usuario) {
    // El usuario ya existe, envía una respuesta indicando que es duplicado
    return res.status(400).json({ error: "Usuario duplicado" });
  }

  Usuario.create({
    cedula,
  })
    .then((usuario) => {
      /* registrarInicio(req, usuario.id); */

      res.status(201).json({ mensaje: "Usuario creado" });
    })
    .catch((err) => {
      console.error("Hubo un error al crear el usuario:", err);
      res.status(500).json({ error: "Error al crear el usuario" });
    });
};

export { registroPost };
