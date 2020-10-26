const { Schema, model } = require("mongoose");

const MedicoSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
  },
  usuario: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
  hospital: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Hospital",
  },
}); //cambiar el nombre de la coleccion en mongo

//para cambiar el esquema funcion normal para apuntatar correctamente con this
MedicoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); //extraemos lo que queremos modificar
  object.id = _id;
  return object;
});

module.exports = model("Medico", MedicoSchema);
