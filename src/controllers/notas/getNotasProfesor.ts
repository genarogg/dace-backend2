import { Request, Response } from "express";

import { verificarToken } from "@fn";

import { Usuario, UsuarioFn } from "@models";

const getNotasProfesor = async (req: Request, res: Response) => {
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

    const notasProfesor = await UsuarioFn.buscarMateriasConProfesorYEstudiantes(
      id
    );

    notasProfesor.forEach((materia) => {
      materia.estudiantesInscritos = materia.estudiantesInscritos.filter(
        (estudiante) => estudiante.nota === null
      );
    });

    res.json(notasProfesor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al obtener las materias" });
  }
};

export default getNotasProfesor;
