import { Response } from "express";
import jwt from "jsonwebtoken";

interface Usuario {
  id: number;
}

const verificarToken = (
  token: string | undefined,
  res: Response
): Usuario | null => {
  if (!token) {
    res.status(401).json({ error: "No se proporcionó token" });
    return null;
  }

  const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";

  try {
    const usuario = jwt.verify(token, JWTSECRETO) as Usuario | null;

    return usuario;
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return null;
  }
};

export default verificarToken;
