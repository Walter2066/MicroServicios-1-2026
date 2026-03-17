const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/db_biblioteca_v");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Error de conexión:", error);
});

db.once("open", () => {
  console.log("Conectado a MongoDB");
});

module.exports = db;