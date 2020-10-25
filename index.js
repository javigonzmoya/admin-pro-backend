const express = require("express");
require("dotenv").config(); //para leer variables de entorno

const cors = require("cors");
const { dbConnection } = require("./database/config");
const { PromiseProvider } = require("mongoose");

// crear servidor express
const app = express();
// configurar cors
app.use(cors());

//parseo del body
app.use(express.json());

dbConnection();

//QvC0uOg0K2AXxOxh
//mean_user

//Rutas
app.use("/api/usuarios", require("./routes/usuarios-route"));
app.use("/api/login", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log("servidor corriendooooo");
});
