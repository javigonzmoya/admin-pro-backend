const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitales = async (req, res) => {
  const hospitales = await Hospital.find().populate("usuario", "nombre email"); //traemos las propiedades del id asignado!!!!!!!!
  res.json({
    ok: true,
    hospitales,
  });
};

const addHospital = async (req, res) => {
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body }); //desestructuramos para construir el id

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hablar con el administrador",
    });
  }
};

const updateHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "puthospitales",
  });
};

const deleteHospital = (req, res) => {
  res.json({
    ok: true,
    msg: "deletehospitales",
  });
};

module.exports = {
  getHospitales,
  addHospital,
  updateHospital,
  deleteHospital,
};
