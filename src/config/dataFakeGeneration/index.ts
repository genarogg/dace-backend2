import chalk from "chalk";
// import crearUsuario from "./crearUsuarios";
// import crearAdmin from "./crearAdmin";
// import crearProfesor from "./crearProfesor";
// import asignarProfesoresAMaterias from "./addProfesorAMateria";
// import asignarMateriasAEstudiante from "./addEstudianteMateria";
// import asignarHorariosAMaterias from "./asignarHorariosAMaterias";
// import crearProfesorDemo from "./addProfesorDemo";

import { Usuario } from "@models";
import populateCarreras from "./populateCarreras";

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

    // await crearProfesorDemo();

    // await crearProfesor(cantidad);
    // await populateMaterias();
    // await asignarProfesoresAMaterias();
    // await crearUsuario(cantidad * 20);
    // await asignarMateriasAEstudiante();
    // await asignarHorariosAMaterias();

    // await crearAdmin();
    console.log(chalk.cyan("Data fake generada exitosamente"));
  } catch (error) {
    console.log(chalk.red("Error al generar data fake"), error);
  }
};

export default dataFakeGeneration;
