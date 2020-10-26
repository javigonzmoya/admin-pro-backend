const fs = require("fs"); //para manejar file sistem
const Usuario = require("../models/usuario");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

const borrarImagen = (path) => {
  //funcion que mediante el path borra una imagen del servidor
  if (fs.existsSync(path)) {
    //borramos la imagen de file sistem
    fs.unlinkSync(path);
  }
};

const aztualizaImagen = async (tipo, id, nombreFile) => {
  let pathOld = "";
  switch (tipo) {
    case "usuarios":
      const usuario = await Usuario.findById(id);
      console.log;
      if (!usuario) {
        console.log("no es un usuario");
        return false;
      }

      pathOld = `./uploads/usuarios/${usuario.img}`;
      borrarImagen(pathOld);

      //asignamos el nuevo file
      usuario.img = nombreFile;
      await usuario.save();
      return true;

      break;
    case "medicos":
      medico = await Medico.findById(id);
      if (!medico) {
        console.log("no es un medico");
        return false;
      }

      pathOld = `./uploads/medicos/${medico.img}`;
      borrarImagen(pathOld);

      //asignamos el nuevo file
      medico.img = nombreFile;
      await medico.save();
      return true;

      break;
    case "hospitales":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log("no es un Hospital");
        return false;
      }

      pathOld = `./uploads/hospitales/${hospital.img}`;
      borrarImagen(pathOld);

      //asignamos el nuevo file
      hospital.img = nombreFile;
      await hospital.save();
      return true;
      break;
  }
};

module.exports = {
  aztualizaImagen,
};
