const { response } = require("express");
const { request } = require("express");
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const getTodo = async (req = request, res = response) => {
  const busqueda = req.params.busqueda;
  const regex = new RegExp(busqueda, "i"); //expresion regular para buscar sin sensibilidad

  /*const usuarios = await Usuario.find({ nombre: regex });
  const medicos = await Medico.find({ nombre: regex });
  const hospitales = await Hospital.find({ nombre: regex });*/

  const [usuarios, medicos, hospitales] = await Promise.all([
    Usuario.find({ nombre: regex }),
    Medico.find({ nombre: regex }),
    Hospital.find({ nombre: regex }),
  ]);

  res.json({
    ok: true,
    usuarios,
    medicos,
    hospitales,
  });
};

const getTodoColeccion = async (req = request, res = response) => {
  const busqueda = req.params.busqueda;
  const tabla = req.params.tabla;
  const regex = new RegExp(busqueda, "i"); //expresion regular para buscar sin sensibilidad

  let data = [];

  switch (tabla) {
    case "medicos":
      data = await Medico.find({ nombre: regex })
        .populate("usuario", "nombre img")
        .populate("hospital", "nombre img");
      break;
    case "hospitales":
      data = await Hospital.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;
    case "usuarios":
      data = await Usuario.find({ nombre: regex }).populate(
        "usuario",
        "nombre img"
      );
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "error en la ruta de peticion",
      });
  }

  res.json({
    ok: true,
    resultado: data,
  });
};
module.exports = {
  getTodo,
  getTodoColeccion,
};
