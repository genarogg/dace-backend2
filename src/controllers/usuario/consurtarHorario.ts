import { Request, Response } from "express";

import { UsuarioFn, Usuario } from "@models";

import { verificarToken } from "@fn";

const consultarHorario = async (req: Request, res: Response) => {
  try {
    const usuario = verificarToken(req.headers.authorization, res);

    if (!usuario) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const { id } = usuario;

    const user = await Usuario.findOne({ where: { id } });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    console.log(id);
    const usuarioh = await UsuarioFn.buscarHorarioDelUsuario(id);

    res.json(usuarioh);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al obtener los horarios" });
  }
};

export default consultarHorario;
