import chalk from "chalk";
//

// import crearProfesor from "./crearProfesor";
// import asignarProfesoresAMaterias from "./addProfesorAMateria";
//
//
// import crearProfesorDemo from "./addProfesorDemo";

import { Usuario } from "../../models";
import populateCarreras from "./populateCarreras";
import populateMaterias from "./populateMaterias";

import papulateProfesor from "./papulateProfesor";
import crearProfesorDemo from "./crearProfesorDemo";
import asignarProfesoresAMaterias from "./asignarProfesoresAMaterias";

import asignarHorariosAMaterias from "./asignarHorariosAMaterias";

import crearEstudiantes from "./crearEstudiantes";

import asignarMateriasAEstudiante from "./asignarMateriasAEstudiante";


import crearAdmin from "./crearAdmin";

const dataFakeGeneration = async (cantidad: number, url: string) => {
  try {
    const usuarioExistente = await Usuario.findOne({
      where: { cedula: "27369469" },
    });

    console.log(chalk.cyan("Base de datos y tablas creadas"));

    if (usuarioExistente) {
      console.log(chalk.cyan("Data fake generada anteriormente"));
      return;
    }

    await populateCarreras();
    await populateMaterias();
    await crearProfesorDemo();

    await papulateProfesor(cantidad);
    await asignarProfesoresAMaterias();
    await asignarHorariosAMaterias();

    await crearEstudiantes(cantidad * 20);
    await asignarMateriasAEstudiante();

    await crearAdmin();
    console.log(chalk.cyan("Data fake generada exitosamente"));
  } catch (error) {
    console.log(chalk.red("Error al generar data fake"), error);
  }
};

export default dataFakeGeneration;
