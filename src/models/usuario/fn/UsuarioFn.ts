import {
  Usuario,
  ProfesorMateria,
  EstudianteMateria,
  Materia,
  Horario,
} from "@models";

class UsuarioFn {
  async buscarPorId(id: number) {
    return await Usuario.findByPk(id);
  }

  //busca las materias del profesor
  async buscarMateriasConProfesor(id: number) {
    const profesor = await Usuario.findByPk(id);
    const profesorMaterias = await ProfesorMateria.findAll({
      where: { UsuarioId: id },
    });

    const materiasProfesor = await Promise.all(
      profesorMaterias.map(async (profesorMateria) => {
        const materia = await Materia.findByPk(profesorMateria.MateriaId);
        return { profesor, materia };
      })
    );

    return materiasProfesor;
  }

  //busca el horario del profesor
  async buscarHorarioDelUsuario(id: number) {
    const profesorData = await this.buscarMateriasConProfesor(id);
    const horarios = [];

    for (const obj of profesorData) {
      // Extrae el id de la materia
      if (obj.materia !== null) {
        const materiaId = obj.materia.id;

        // Busca el horario correspondiente en la base de datos
        const horario = await Horario.findAll({
          where: { MateriaId: materiaId },
        });

        console.log(horario);

        if (!horario) {
          throw new Error("Horario no encontrado");
        }

        horarios.push(horario);
      }
    }

    const combinarProfesorDataYHorarios = (
      profesorData: any,
      horarios: any
    ) => {
      // Aplana el array de arrays de horarios en un solo array
      const horariosAplanados = horarios.flat();

      return profesorData.map((data: any) => {
        const horariosMateria = horariosAplanados.filter(
          (horario: any) => horario.MateriaId === data.materia.id
        );
        return {
          ...data,
          horarios: horariosMateria.length > 0 ? horariosMateria : null,
        };
      });
    };

    const resultado = combinarProfesorDataYHorarios(profesorData, horarios);

    return resultado;
  }

  //busca las materias del estudiantes
  async buscarMateriasDelEstudiante(id: number) {
    const estudianteMaterias = await EstudianteMateria.findAll({
      where: { UsuarioId: id },
    });

    return estudianteMaterias;
  }

  // buscar Materias Con Profesor Y Estudiantes
  async buscarMateriasConProfesorYEstudiantes(id: number) {
    const profesor = await Usuario.findByPk(id);

    if (!profesor) {
      throw new Error("Profesor no encontrado");
    }

    const profesorMaterias = await ProfesorMateria.findAll({
      where: { UsuarioId: id },
    });

    const materiasProfesor = await Promise.all(
      profesorMaterias.map(async (profesorMateria) => {
        const materia = await Materia.findByPk(profesorMateria.MateriaId);

        if (!materia) {
          throw new Error("Materia no encontrado");
        }

        const estudiantesInscritos = await EstudianteMateria.findAll({
          where: { MateriaId: profesorMateria.MateriaId },
          include: Usuario,
        });

        const data = {
          materia: {
            nombre: materia.nombre,
            id: materia.id,
            uc: materia.uc,
            seccion: materia.seccion,
          },
          profesor: {
            id: profesor.id,
            nombre: profesor.nombre,
            segundoNombre: profesor.segundoNombre,
            apellido: profesor.apellido,
            segundoApellido: profesor.segundoApellido,
            cedula: profesor.cedula,
          },
          estudiantesInscritos: estudiantesInscritos.map((estudiante: any) => ({
            id: estudiante.Usuario.id,
            nombre: estudiante.Usuario.nombre,
            segundoNombre: estudiante.Usuario.segundoNombre,
            apellido: estudiante.Usuario.apellido,
            segundoApellido: estudiante.Usuario.segundoApellido,
            cedula: estudiante.Usuario.cedula,
            nota: estudiante.nota,
          })),
        };
        return data;
      })
    );

    return materiasProfesor;
  }
}

export default new UsuarioFn();
