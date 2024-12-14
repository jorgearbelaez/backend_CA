import Usuario from "../models/UserModel.js";
import PerfilProfesional from "../models/ProfessionalModel.js";
import Disponibilidad from "../models/AvailableModel.js";
import Reserva from "../models/BookingModel.js";

const obtenerProEspecialidadFechaHora = async (req, res) => {
  const { especialidad } = req.params;
  const { fecha, citaHora } = req.body;
  let profesionalesDisponibles = [];

  try {
    const profesionales = await Disponibilidad.find({
      fecha,
      hora: { $in: citaHora },
    }).populate({ path: "creador", populate: { path: "creador" } });

    console.log(profesionales);

    for (let i = 0; i < profesionales.length; i++) {
      if (profesionales[i].creador.especialidad.includes(especialidad)) {
        const data = {
          profesional_id: profesionales[i].creador._id,
          descripcion: profesionales[i].creador.descripcion,
          nombre: profesionales[i].creador.creador.nombre,
          apellido: profesionales[i].creador.creador.apellido,
          img: profesionales[i].creador.creador.img,
        };

        profesionalesDisponibles.push(data);
      }
    }

    // if (profesionalesDisponibles.toString() == [])
    if (profesionalesDisponibles.length === 0) {
      const error = new Error("No hay profesionales disponibles");
      return res.status(404).json({ msg: error.message });
    }
    res.status(200).json(profesionalesDisponibles);
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "hubo problema intentando acceder a los profesionales" });
  }
};

const obtenerProfesional = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const profesional = await PerfilProfesional.findById(id).populate(
    "creador",
    "nombre apellido img descripcion"
  );

  res.json(profesional);
};

const crearReserva = async (req, res) => {
  const { _id } = req.usuario;
  const { id } = req.params;

  let { citaDia, citaHora, precio, servicio } = req.body;

  try {
    // Comprobar si el usuario existe
    const usuario = await Usuario.findById({ _id });

    const profesionalID = await PerfilProfesional.findById(id);
    if (!usuario) {
      const error = new Error("El usuario no esta registrado");
      return res.status(404).json({ msg: error.message });
    }

    const nuevaReserva = {
      precio,
      servicio,
      citaDia,
      citaHora,
      cliente: _id,
      profesional: id,
    };

    const reserva = await Reserva.create(nuevaReserva);

    usuario.reservas.push(reserva);
    profesionalID.reservas.push(reserva);

    await usuario.save();
    await profesionalID.save();

    return res.status(200).json({
      message: "Reserva creada satisfactoriamente",
      data: reserva,
    });
  } catch (err) {
    return res.status(500).json({ message: "La reserva no pudo ser creada" });
  }
};
const listarReservas = async (req, res) => {
  const { limite = 10, pagina = 1 } = req.query;
  const query = {};

  try {
    const [total, reservas] = await Promise.all([
      Reserva.countDocuments(query),
      Reserva.find(query)
        .skip(Number(limite * (pagina - 1)))
        .limit(Number(limite)),
    ]);

    res.json({
      totalReservas: total,
      paginaActual: Number(pagina),
      totalPaginas: Math.ceil(total / limite),
      resultados: reservas,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando acceder a las reservas" });
  }
};
const eliminarReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      const error = new Error("Reserva no Encontrado");
      return res.status(401).json({ msg: error.message });
    }

    if (
      reserva.cliente.toString() !== req.usuario._id.toString() &&
      req.usuario.rol !== "ADMIN"
    ) {
      const error = new Error("Accion no válida");
      return res.status(401).json({ msg: error.message });
    }

    await Reserva.deleteOne();

    res.status(201).json({ msg: "Reserva eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando eliminar la reserva" });
  }
};

// const disponibles = async (req, res) => {
//   let profesionalesPorFecha = [];
//   console.log(profesionalesPorFecha);
//   try {
//     const profesionales = await PerfilProfesional.find({
//       especialidad,
//     })
//       .populate("creador", "nombre apellido img descripcion")
//       .populate("disponibilidad", "fecha");

//     for (let i = 0; i < profesionales.length; i++) {
//       for (let j = 0; j < profesionales[i].disponibilidad.length; j++) {
//         if (profesionales[i].disponibilidad[j].fecha === fecha) {
//           const data = {
//             id: profesionales[i].creador._id,
//             nombre: profesionales[i].creador.nombre,
//             apellido: profesionales[i].creador.apellido,
//             img: profesionales[i].creador.img,
//             descripcion: profesionales[i].descripcion,
//             profesional_id: profesionales[i]._id,
//           };

//           profesionalesPorFecha.push(data);
//         }
//       }
//     }
//     console.log(profesionalesPorFecha);

//     res.json(disponibles);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ msg: "no hay profesionales disponibles para esa fecha" });
//   }
// };

export {
  obtenerProEspecialidadFechaHora,
  obtenerProfesional,
  crearReserva,
  listarReservas,
  eliminarReserva,
  // disponibles,
};
