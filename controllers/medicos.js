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

const updateMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "putMedicoes",
  });
};

const deleteMedico = (req, res) => {
  res.json({
    ok: true,
    msg: "deleteMedicoes",
  });
};

module.exports = {
  getMedicos,
  addMedico,
  updateMedico,
  deleteMedico,
};
