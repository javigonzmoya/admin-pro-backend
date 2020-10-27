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

const updateHospital = async (req, res = response) => {
  const { id } = req.params;
  const uid = req.uid;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Id de hospital inexistente",
      });
    }

    const cambiosHospital = {
      ...req.body,
      usuario: uid,
    };

    const hospitalAztualizado = await Hospital.findByIdAndUpdate(
      id,
      cambiosHospital,
      { new: true }
    );

    res.json({
      ok: true,
      msg: "Hospital aztualizado",
      hospital: hospitalAztualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error inexperado",
    });
  }
};

const deleteHospital = async (req, res) => {
  const { id } = req.params;

  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Id de hospital inexistente",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital Borrado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ocurrio un error inexperado",
    });
  }
};

module.exports = {
  getHospitales,
  addHospital,
  updateHospital,
  deleteHospital,
};
