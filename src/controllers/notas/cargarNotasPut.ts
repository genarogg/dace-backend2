import { Request, Response } from "express";
import { EstudianteMateria, Usuario, Materia } from "@models";
import { verificarToken } from "@fn";

import { sendEmail } from "@email";

const cargarNotasPut = async (req: Request, res: Response) => {
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

    let materiaInfo = await Materia.findByPk(data.materia);

    const link = `${process.env.CORS_URL}`;

    for (const estudiante of data.estudiantes) {
      // Comprueba si la nota del estudiante no es null
      if (estudiante.nota !== null) {
        await EstudianteMateria.update(
          { nota: estudiante.nota }, // Actualiza el campo nota con el valor de estudiante.nota
          {
            where: {
              usuarioId: estudiante.id,
              materiaId: data.materia,
            },
          }
        );

        // Preparar los datos para el email
        const user = await Usuario.findByPk(estudiante.id); // Asumiendo que el nombre está disponible en el objeto estudiante

        const nota = estudiante.nota;

        if (!user?.correo) {
          console.log("El usuario no tiene correo");
          continue;
        }

        if (
          user.correo === "ana06rosa@gmail.com" ||
          user.correo === "desarrollowebgg@gmail.com"
        ) {
          // Enviar email al estudiante
          await sendEmail({
            email: user.correo, // Asumiendo que el correo está disponible en el objeto estudiante
            subject: "Tu nota ha sido cargada",
            templateName: "notaCargada",
            templateData: {
              nombreEstudiante: user.nombre,
              nombreMateria: materiaInfo?.nombre,
              nota,
              link,
            },
          });
        }
      }
    }

    res.json({ message: "Notas actualizadas correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Hubo un error al cargar las notas" });
  }
};

export default cargarNotasPut;
