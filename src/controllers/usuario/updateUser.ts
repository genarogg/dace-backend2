import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Usuario } from "@models";

import { verificarToken } from "@fn";

const updateUser = async (req: Request, res: Response): Promise<any> => {
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

    const {
      email: correo,
      firstName: nombre,
      secondName: segundoNombre,
      firstSurname: apellido,
      secondSurname: segundoApellido,
      birthdate: fechaDeNacimiento,
      direction: direccion,
      phoneNumber: telefono,
      sex: genero,
      parroquia,
      etnia,
      oldPassword,
      password,
    } = req.body;

    if (password) {
      //comprueba si la contraseña anterior es correcta
      if (!bcrypt.compareSync(oldPassword, user.contrasena)) {
        return res
          .status(400)
          .json({ error: "contraseña anterior incorrectos" });
      }

      await user.update({ contrasena: bcrypt.hashSync(password, 10) });

      return res.status(200).json({ message: "Contraseña actualizada" });
    }

    if (nombre) {
      const newData = {
        correo,
        nombre,
        segundoNombre,
        apellido,
        segundoApellido,
        fechaDeNacimiento,
        direccion,
        telefono,
        genero,
        parroquia,
        etnia,
      };
      await user.update(newData);

      return res.status(200).json({ message: "Usuario actualizado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

export default updateUser;
