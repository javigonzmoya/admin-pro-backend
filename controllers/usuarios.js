const { response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.find({}, "nombre email role");

  res.json({
    ok: true,
    usuarios,
    uid: req.uid, //mandamos el uid del usuario de sesion ---compartimos el token entre peticiomens de middlewere
  });
};

const addUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const extisteEmail = await Usuario.findOne({ email }); //buscamos por campo en la bd

    if (extisteEmail) {
      return res.status(400).json({
        //debemos retornar para no tener problemas
        ok: false,
        msg: "Email existente en la Base de datos",
      });
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error Inesperado...",
    });
  }
};

const updateUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario con id inexistente",
      });
    }

    //aztualizar y extraccion con desectructuracon

    const { google, password, email, ...campos } = req.body;

    if (usuarioDb.email !== email) {
      const extisteEmail = await Usuario.findOne({ email });
      if (extisteEmail) {
        res.status(404).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;
    const usuarioActuralizado = await Usuario.findOneAndUpdate(uid, campos, {
      new: true,
    }); //si no devulve el usuario anterior

    // TODO: validar token

    res.json({
      ok: true,
      usuario: usuarioActuralizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

const deleteUsuario = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario con id inexistente",
      });
    }
    await Usuario.findByIdAndDelete(uid);
    res.json({
      ok: true,
      uid: "usuario eliminado",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado...",
    });
  }
};

module.exports = {
  getUsuarios,
  addUsuario,
  updateUsuario,
  deleteUsuario,
};
