import Usuario from "../models/UserModel.js";
import PerfilProfesional from "../models/ProfessionalModel.js";
import Disponibilidad from "../models/AvailableModel.js";

const actualizarProfesional = async (req, res) => {
  const { _id } = req.usuario;

  const { descripcion, especialidades } = req.body;
  try {
    // Comprobar si el usuario existe
    const profesional = await PerfilProfesional.findOne({ creador: _id });

    if (!profesional) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }

    if (descripcion) {
      profesional.descripcion = descripcion;
    }

    if (especialidades && especialidades.length > 0) {
      profesional.especialidad =
        especialidades.map((especialidad) => especialidad) ||
        profesional.especialidad;
    }
    await profesional.save();

    res.json({
      msg: "Perfil profesional actualizado correctamente",
      profesional,
    });
  } catch (error) {
    console.log(error);
  }
};

const perfilProfesional = async (req, res) => {
  const { _id } = req.usuario;

  try {
    const profesional = await PerfilProfesional.findOne({
      creador: _id,
    })
      .populate("creador", "nombre")
      .populate({
        path: "disponibilidad",
        select: "-creador -createdAt -updatedAt",
      });

    if (!profesional) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }

    res.json({
      profesional,
    });
  } catch (error) {
    console.log(error);
  }
};

const crearDisponibilidad = async (req, res) => {
  const { fecha, hora } = req.body;

  const profesional = await PerfilProfesional.findById(req.usuario.profesional);
  console.log(profesional);

  const existeDisponibilidad = await Disponibilidad.findOne({
    fecha,
    creador: profesional._id,
  });

  if (existeDisponibilidad) {
    const error = new Error("Ya existe un horario en esa fecha");
    return res.status(404).json({ msg: error.message });
  }

  const nuevaDisponibilidad = new Disponibilidad({
    fecha,
    hora,
    creador: profesional._id,
  });
  await nuevaDisponibilidad.save();
  profesional.disponibilidad.push(nuevaDisponibilidad);
  await profesional.save();

  res.json({
    msg: "Disponibilidad agregada",
  });
};

const editarDisponibilidad = async (req, res) => {
  const { id } = req.params;
  const { hora } = req.body;
  try {
    const disponibilidad = await Disponibilidad.findById(id);
    if (!disponibilidad) {
      const error = new Error("No Encontrado");
      return res.status(401).json({ msg: error.message });
    }
    if (
      disponibilidad.creador.toString() !== req.usuario.profesional.toString()
    ) {
      const error = new Error("Accion no válida");
      return res.status(401).json({ msg: error.message });
    }

    disponibilidad.hora = hora || disponibilidad.hora;

    const disponibilidadActualizada = await disponibilidad.save();

    res.json({
      msg: "Actualizado correctamente",
      disponibilidadActualizada,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error intentado acceder a la informacion" });
  }
};
const eliminarDisponibilidad = async (req, res) => {
  const { id } = req.params;
  try {
    const disponibilidad = await Disponibilidad.findById(id);
    if (!disponibilidad) {
      const error = new Error("No Encontrado");
      return res.status(401).json({ msg: error.message });
    }
    if (
      disponibilidad.creador.toString() !== req.usuario.profesional.toString()
    ) {
      const error = new Error("Accion no válida");
      return res.status(401).json({ msg: error.message });
    }

    await disponibilidad.deleteOne();

    //eliminamos el id del array del perfil profesional
    const Profesional = await PerfilProfesional.findById(
      req.usuario.profesional
    );

    const disponibilidadesRestantes = Profesional.disponibilidad.filter(
      (disponibilidad) => disponibilidad.toString() !== id.toString()
    );
    Profesional.disponibilidad = disponibilidadesRestantes;

    Profesional.save();

    res.json({
      msg: "Disponibilidad eliminada correctamente",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Error intentado acceder a la informacion" });
  }
};

export {
  perfilProfesional,
  actualizarProfesional,
  crearDisponibilidad,
  editarDisponibilidad,
  eliminarDisponibilidad,
};
