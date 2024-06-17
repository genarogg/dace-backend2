/* import { registrarInicio } from "./fn"; */

import { Request, Response } from "express";

import { Usuario, CarrerasDelUsuario } from "@models";

const registroPost = async (req: Request, res: Response) => {
  //{ cedula: '123456789', carrera: 'Ingeniería en Sistemas'}

  const { cedula, carrera } = req.body;

  if (!cedula || !carrera) {
    return res
      .status(200)
      .json({ mensaje: "Se necesita proporcionar la cedula" });
  }

  const usuario = await Usuario.findOne({ where: { cedula: cedula } });

  if (usuario) {
    return res.status(400).json({ error: "Usuario duplicado" });
  }

  Usuario.create({
    cedula,
  })
    .then(async (usuario) => {
      await CarrerasDelUsuario.create({
        nombreCarrera: carrera,
        usuarioId: usuario.id,
      });

      //@Bitacora

      res.status(201).json({ mensaje: "Usuario creado" });
    })
    .catch((err) => {
      console.error("Hubo un error al crear el usuario y/o la carrera:", err);
      res
        .status(500)
        .json({ error: "Error al crear el usuario y/o la carrera" });
    });
};

export { registroPost };
