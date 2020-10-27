const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate("usuario", "nombre email")
    .populate("hospital", "nombre"); //traemos las propiedades del id asignado!!!!!!!!
  res.json({
    ok: true,
    medicos,
  });
};

const addMedico = async (req, res = response) => {
  const uid = req.uid;
  const medico = new Medico({ usuario: uid, ...req.body }); //desestructuramos para construir el id

  try {
    const medicoDB = await medico.save();

    res.json({
      ok: true,
      medico: medicoDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hablar con el administrador",
    });
  }
};

const updateMedico = async (req, res) => {
  const { id } = req.params;
  const uid = req.uid;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico inexistente",
      });
    }

    const camposAztualizados = {
      ...req.body,
      usuario: uid,
    };

    const medicoAztualizado = await Medico.findByIdAndUpdate(
      id,
      camposAztualizados,
      {
        new: true,
      }
    );
    res.json({
      ok: true,
      msg: "Medico aztualizado",
      medico: medicoAztualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hablar con el administrador",
    });
  }
};

const deleteMedico = async (req, res) => {
  const { id } = req.params;

  try {
    const medicoDB = await Medico.findById(id);

    if (!medicoDB) {
      return res.status(404).json({
        ok: false,
        msg: "Medico inexistente",
      });
    }

    await Medico.findByIdAndDelete(id);
    res.json({
      ok: true,
      msg: "Medico Borrado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hablar con el administrador",
    });
  }
};

module.exports = {
  getMedicos,
  addMedico,
  updateMedico,
  deleteMedico,
};
