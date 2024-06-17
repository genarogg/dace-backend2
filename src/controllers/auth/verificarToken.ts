import { Request, Response } from "express";
import { verificarToken } from "@fn";

const verificarTokenPost = async (
  req: Request,
  res: Response
): Promise<Response> => {
 
  const usuario = verificarToken(req.headers.authorization, res);

  if (!usuario) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }

  return res.json({ usuario });
};

export default verificarTokenPost;
