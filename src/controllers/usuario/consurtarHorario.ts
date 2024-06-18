import { Request, Response } from "express";

import { UsuarioFn, Usuario } from "@models";

import { verificarToken } from "@fn";

const consultarHorario = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ error: "No se proporcionó token" });
      return null;
    }

    const usuario = verificarToken(token);

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

    // const id = 1;
    const usuarioh = await UsuarioFn.buscarHorarioDelUsuario(id);
    /* console.log(JSON.stringify(usuarioh)); */

    const resultado = usuarioh.map((item: any) => ({
      fake: {
        id: 1,
        periodo: "2021-1",
      },

      profesor: {
        id: item.profesor.id,
        nombre: item.profesor.nombre,
        segundoNombre: item.profesor.segundoNombre,
        apellido: item.profesor.apellido,
        segundoApellido: item.profesor.segundoApellido,
        cedula: item.profesor.cedula,
        carrera:
          item.profesor.carrera ||
          "INGENIERIA EN INFORMATICA - INGENIERIA DE SISTEMAS",
      },
      materia: {
        id: item.materia.id,
        nombre: item.materia.nombre,
        seccion: item.materia.seccion,
        codigo: item.materia.codigo,
      },
      horario: item.horarios.map((horario: any) => ({
        id: horario.id,
        dia: horario.dia,
        horaInicio: horario.horaInicio,
        horaFin: horario.horaFin,
        aula: horario.aula,
      })),
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Hubo un error al obtener los horarios" });
  }
};

export default consultarHorario;
