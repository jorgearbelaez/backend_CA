import Usuario from "../models/UserModel.js";
import PerfilProfesional from "../models/ProfessionalModel.js";
import generarIdToken from "../helpers/generateIdToken.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";
import ExcelJS from "exceljs";

// REGISTRAR A LOS USUARIOS
const registrar = async (req, res) => {
  const { email } = req.body;

  // verificar si el email existe
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    // crea un usuario
    const usuario = new Usuario(req.body);

    // generamos el token id
    usuario.token = generarIdToken();

    // almacena el usuario
    await usuario.save();

    // Enviar el email de confirmacion
    const { nombre, email, token } = usuario;
    emailRegistro({
      email,
      nombre,
      token,
    });

    res.json({
      msg: "Usuario creado correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

// CONFIRMAR LAS CUENTAS
const confirmar = async (req, res) => {
  // acceder al token
  const { token } = req.params;

  // Comprobar si el usuario existe
  const confirmarUsuario = await Usuario.findOne({ token });

  if (!confirmarUsuario) {
    const error = new Error("Token no Válido");
    return res.status(403).json({ msg: error.message });
  }

  if (confirmarUsuario.confirmado) {
    const error = new Error("El usuario ya esta confirmado");
    return res.status(403).json({ msg: error.message });
  }

  try {
    confirmarUsuario.token = "";
    confirmarUsuario.confirmado = true;
    await confirmarUsuario.save();
    return res.json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// RECUPERAR PASSWORD
const olvidePassword = async (req, res) => {
  // Comprobar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });

  if (!usuario) {
    const error = new Error("Usuario no registrado");
    return res.status(404).json({ msg: error.message });
  }
  if (usuario.google === true) {
    const error = new Error("Debe iniciar sesión por medio de google");
    return res.status(404).json({ msg: error.message });
  }

  try {
    //generamos un nuevo idtoken
    usuario.token = generarIdToken();
    await usuario.save();

    //enviar el email con instrucciones
    const { nombre, email, token } = usuario;

    emailOlvidePassword({
      email,
      nombre,
      token,
    });

    res.json({
      msg: `Hemos enviado un email a ${email} con las instrucciones para recuperar su contraseña`,
    });
  } catch (error) {
    console.log(error);
  }
};

// VALIDAR TOKEN
const comprobarIdToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  console.log(tokenValido);

  if (!tokenValido) {
    const error = new Error("Token no válido");
    return res.status(403).json({
      msg: error.message,
    });
  }

  res.json({
    msg: "token valido",
  });
};
// ACTUALIZACIÓN PASSWORD
const actualizarPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await Usuario.findOne({ token });

  if (usuario) {
    try {
      usuario.password = password;
      usuario.token = "";
      await usuario.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no Válido");
    return res.status(403).json({ msg: error.message });
  }
};

// OBTENER PERFIL
const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

// ACTUALIZAR PERFIL
const actualizarPerfil = async (req, res) => {
  const { _id } = req.usuario; //_id proveniente del usuario de la validacion del JWT)

  //datos a actualizar provenientes del formulario
  const {
    nombre,
    apellido,
    telefono,
    localidad,
    barrio,
    direccion,
    email,
    sexo,
  } = req.body;

  try {
    // Comprobar si el usuario existe
    const usuario = await Usuario.findById({ _id });

    if (!usuario) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }
    if (nombre) {
      usuario.nombre = nombre;
    }
    if (apellido) {
      usuario.apellido = apellido;
    }
    if (sexo) {
      usuario.sexo = sexo;
    }
    if (email && email !== req.usuario.email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        const error = new Error("Ese email ya esta registrado");
        return res.status(404).json({ msg: error.message });
      }

      usuario.email = email;
    }
    if (telefono) {
      usuario.telefono = telefono;
    }
    if (localidad) {
      usuario.localidad = localidad;
    }
    if (barrio) {
      usuario.barrio = barrio;
    }
    if (direccion) {
      usuario.direccion = direccion;
    }

    await usuario.save();

    res.json({
      msg: "Perfil actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const cambiarPassword = async (req, res) => {
  const { _id } = req.usuario;
  const { password, nuevoPassword } = req.body;

  try {
    const usuario = await Usuario.findById({ _id });
    if (!usuario) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }
    if (!usuario.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }

    if (password && nuevoPassword) {
      if (await usuario.comprobarPassword(password)) {
        usuario.password = nuevoPassword;
      } else {
        const error = new Error("El password es incorrecto");
        return res.status(403).json({ msg: error.message });
      }
    } else {
      const error = new Error("Ambos campos son requeridos");
      return res.status(403).json({ msg: error.message });
    }

    await usuario.save();
    res.json({
      msg: "Password modificado correctamente",
    });
  } catch (error) {
    console.log(error);
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findById(id).select("-password");

    return res.json(usuario);
  } catch (error) {
    return res.status(500).json({ msg: "Error intentando acceder al usuario" });
  }
};

const desactivarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res
      .status(200)
      .json({ msg: `Usuario ${usuario.email} fue desactivado exitosamente` });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando desactivar al usuario" });
  }
};

// PROFESIONAL

const registrarProfesional = async (req, res) => {
  const { email } = req.body;

  const existeusuario = await Usuario.findOne({ email });
  if (existeusuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);

    // generamos el token id
    usuario.token = generarIdToken();
    usuario.rol = "PROFESIONAL";

    const nuevoPerfilProfesional = new PerfilProfesional({
      creador: usuario._id,
    });

    await nuevoPerfilProfesional.save();

    usuario.profesional = nuevoPerfilProfesional;
    await usuario.save();

    // Enviar el email de confirmacion
    const { nombre, email, token } = usuario;
    emailRegistro({
      email,
      nombre,
      token,
    });

    res.json({
      msg: "Usuario Profesional creado correctamente, Revisa tu Email para confirmar tu cuenta",
    });
  } catch (error) {
    console.log(error);
  }
};

const usuariosExcel = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Usuarios");

    worksheet.columns = [
      { header: "#", key: "numero", width: 5 },
      { header: "Nombres", key: "nombre", width: 20 },
      { header: "Apellidos", key: "apellido", width: 20 },
      { header: "Email", key: "email", width: 30 },
      { header: "Rol", key: "rol", width: 15 },
      { header: "Telefono", key: "telefono", width: 15 },
      { header: "Sexo", key: "sexo", width: 15 },
    ];

    let counter = 1;

    usuarios.forEach((usuario) => {
      usuario.numero = counter;
      worksheet.addRow(usuario);
      counter += 1;
    });
    worksheet.getRow(1).eachCell((celda) => {
      celda.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheatml.sheet"
    );

    res.setHeader("Content-Disposition", `attachment; filename=usuarios.xlsx`);

    return workbook.xlsx.write(res).then(() => {
      res.status(200);
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  registrar,
  confirmar,
  olvidePassword,
  comprobarIdToken,
  actualizarPassword,
  perfil,
  actualizarPerfil,
  cambiarPassword,
  obtenerUsuario,
  desactivarUsuario,
  usuariosExcel,
  registrarProfesional,
};
