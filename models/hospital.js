const { Schema, model } = require("mongoose");

const HospitalSchema = Schema(
  {
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
  },
  { collection: "hospitales" }
); //cambiar el nombre de la coleccion en mongo

//para cambiar el esquema funcion normal para apuntatar correctamente con this
HospitalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); //extraemos lo que queremos modificar
  object.id = _id;
  return object;
});

module.exports = model("Hospital", HospitalSchema);
