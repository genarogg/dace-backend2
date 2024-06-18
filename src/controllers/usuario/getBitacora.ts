import { Request, Response } from "express";
import { BitacoraLogin } from "@models";

import { verificarToken } from "@fn";

const getBitacora = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "No se proporcionó token" });
    }

    const usuario = verificarToken(token);

    if (!usuario) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const { id } = usuario;

    const data = await BitacoraLogin.findAll({ where: { usuarioId: id } });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

export default getBitacora;
