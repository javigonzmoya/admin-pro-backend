const path = require("path"); //importamos para generar el path de la imagen
const fs = require("fs");

const { response } = require("express");
const { request } = require("express");
const { v4: uuidv4 } = require("uuid");
const { aztualizaImagen } = require("../helpers/aztualizar-imagen");

const fileUpload = (req = request, res = response) => {
  const { tipo, id } = req.params;

  const tiposValidos = ["hospitales", "medicos", "usuarios"];

  //validamos que la llamada es correcta en sus parametros
  if (!tiposValidos.includes(tipo)) {
    return res.status(400).json({
      ok: false,
      msg: "Tipo incorrecto",
    });
  }
  //validamos que esxiste un archivo
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No existe archivo",
    });
  }

  //ahora procesamos la imagen
  const file = req.files.imagen;

  //sacamos extension del archivo
  const nombreCortado = file.name.split(".");
  const extencionFile = nombreCortado[nombreCortado.length - 1];

  //validar extension

  const extensionValida = ["png", "jpg", "jpeg", "gif"];
  if (!extensionValida.includes(extencionFile)) {
    return res.status(400).json({
      ok: false,
      msg: "Extension de archivo incorrecta",
    });
  }

  //generamos el nombre del file
  const nombreFile = `${uuidv4()}.${extencionFile}`;

  //generamos el path del file
  const path = `./uploads/${tipo}/${nombreFile}`;
  //mover la imagen
  file.mv(path, (err) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        msg: "Error al mover la imagen",
      });
    }

    //aztualizar imagen de la bd
    aztualizaImagen(tipo, id, nombreFile);

    res.json({
      ok: true,
      msg: "Archivo subido correctamente",
      nombreFile,
    });
  });
};

const getImagen = (req = request, res = response) => {
  const { tipo, foto } = req.params;
  console.log(foto);

  // para construir el path ------------  __dirname nombre directorio server + nuestra ruta fisica de proyecto
  const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

  ///cogemos una imagen por defecto--
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImgDef = path.join(__dirname, `../uploads/defecto.jpg`);
    res.sendFile(pathImgDef);
  }
};

module.exports = {
  fileUpload,
  getImagen,
};
