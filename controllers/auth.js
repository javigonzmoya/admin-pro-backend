const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    //veridicar email
    const usuarioBd = await Usuario.findOne({ email });
    if (!usuarioBd) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario inexistente",
      });
    }

    //verificar contraseña
    const validPassword = bcryptjs.compareSync(password, usuarioBd.password);

    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Contraseña no valida",
      });
    }
    // generar token--jwk
    const token = await generarJWT(usuarioBd.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const renweToken = async (req, res = response) => {
  const { uid } = req.body;

  // generar token--jwk
  const token = await generarJWT(uid);

  res.status(404).json({
    ok: true,
    msg: "Refrescar token",
    token,
  });
};

module.exports = {
  login,
  renweToken,
};
