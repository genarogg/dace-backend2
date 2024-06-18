import { Request, Response } from "express";
import { EstudianteMateria, Usuario } from "@models";
import { verificarToken } from "@fn";

const cargarNotasPut = async (req: Request, res: Response) => {
  try {
    const usuario = verificarToken(req.headers.authorization, res);

    if (!usuario) {
      res.status(401).json({ error: "Token inválido" });
      return;
    }

    const { id } = usuario;

    const user = await Usuario.findByPk(id);

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
      return;
    }

    const { esProfesor } = user;

    if (!esProfesor) {
      res.status(401).json({ error: "No tiene permisos para esta acción" });
      return;
    }

    const data = req.body;

    console.log(data);

    for (const estudiante of data.estudiantes) {
      // Comprueba si la nota del estudiante no es null
      if (estudiante.nota !== null) {
       
        console.log(estudiante.id, estudiante.nota)
        await EstudianteMateria.update(
          { nota: estudiante.nota }, // Actualiza el campo nota con el valor de estudiante.nota
          {
            where: {
              usuarioId: estudiante.id,
                materiaId: data.materia
            },
          }
        );
      }
    }

    res.json({ message: "Notas actualizadas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al cargar las notas" });
  }
};

export default cargarNotasPut;
