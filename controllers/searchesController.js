import Usuario from "../models/UserModel.js";
import PerfilProfesional from "../models/ProfessionalModel.js";
const buscarUsuarios = async (req, res) => {
  const { termino } = req.params;
  const { limite = 10, pagina = 1 } = req.query;

  const queryStr = { ...req.query };
  let excluirCampos = ["pagina", "limite"];
  excluirCampos.forEach((element) => delete queryStr[element]);

  console.log(req.query, queryStr);

  const regex = new RegExp(termino, "i");

  const criteria = {
    $or: [
      { nombre: regex },
      { apellido: regex },
      { email: regex },
      { rol: regex },
      { telefono: regex },
    ],
    $and: [queryStr],
  };

  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(criteria),
      Usuario.find(criteria)
        .skip(Number(limite * (pagina - 1)))
        .limit(Number(limite)),
    ]);

    res.json({
      totalUsuarios: total,
      paginaActual: Number(pagina),
      totalPaginas: Math.ceil(total / limite),
      resultados: usuarios,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando acceder a los usuarios" });
  }
};
const obtenerUsuarios = async (req, res) => {
  const { limite = 10, pagina = 1 } = req.query;

  const queryStr = { ...req.query };
  let excluirCampos = ["pagina", "limite"];
  excluirCampos.forEach((element) => delete queryStr[element]);

  console.log(req.query, queryStr);

  try {
    const [total, usuarios] = await Promise.all([
      Usuario.countDocuments(queryStr),
      Usuario.find(queryStr)
        .skip(Number(limite * (pagina - 1)))
        .limit(Number(limite)),
    ]);

    res.json({
      totalUsuarios: total,
      paginaActual: Number(pagina),
      totalPaginas: Math.ceil(total / limite),
      resultados: usuarios,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando acceder a los usuarios" });
  }
};
const obtenerProfesionales = async (req, res) => {
  const { limite = 10, pagina = 1 } = req.query;

  const { fecha, hora, servicio } = req.body;

  console.log(fecha, hora, servicio);
  const criteria = {
    especialidad: servicio,
  };

  console.log(criteria);

  try {
    const [total, usuarios] = await Promise.all([
      PerfilProfesional.countDocuments(criteria),
      PerfilProfesional.find(criteria)
        .skip(Number(limite * (pagina - 1)))
        .limit(Number(limite)),
    ]);

    res.json({
      totalUsuarios: total,
      paginaActual: Number(pagina),
      totalPaginas: Math.ceil(total / limite),
      resultados: usuarios,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error intentando acceder a los usuarios" });
  }
};

export { buscarUsuarios, obtenerUsuarios, obtenerProfesionales };
