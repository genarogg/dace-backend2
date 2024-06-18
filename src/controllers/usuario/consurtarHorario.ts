import { Request, Response } from "express";

import { UsuarioFn } from "@models";

const consultarHorario = async (req: Request, res: Response) => {
  try {
    const id = 1;
    console.log(id);
    const usuarioh = await UsuarioFn.buscarHorarioDelUsuario(id);

    res.json(usuarioh);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al obtener los horarios" });
  }
};

export default consultarHorario;
