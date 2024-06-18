import jwt, { JwtPayload } from "jsonwebtoken";

interface Usuario {
  id: number;
}

const verificarToken = (token: string | undefined): Usuario | null => {
  const JWTSECRETO = process.env.JWTSECRETO || "jwt-secret";

  if (!token) {
    console.error("Token no proporcionado");
    return null;
  }

  try {
    const payload = jwt.verify(token, JWTSECRETO) as JwtPayload | undefined;

    if (!payload || !payload.id) {
      console.error("El token no contiene un id de usuario válido");
      return null;
    }

    const usuario: Usuario = {
      id: payload.id,
    };

    return usuario;
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return null;
  }
};

export default verificarToken;
