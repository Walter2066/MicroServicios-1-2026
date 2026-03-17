const express = require("express");
const app = express();

app.use(express.static("public"));

const methodOverride = require("method-override");

// Conexión a la base de datos MongoDB
const db = require("./config/database");

// Cargamos la base de datos con una semilla
const seedBooks = require("./seed");
// ejecutar seed cuando MongoDB esté conectado
db.once("open", async () => {
  await seedBooks();
});

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");

// Permitir recibir datos de formularios
app.use(express.urlencoded({ extended: true }));

// Permite simular métodos PUT y DELETE
app.use(methodOverride("_method"));

// Importar el modelo que representa la colección de libros
const Book = require("./models/book");



// RUTAS CRUD PARA LIBROS

// Obtener y mostrar todos los libros almacenados en la base de datos
app.get("/", async (req, res) => {
  const books = await Book.find();
  res.render("index", { books });
});


// Mostrar el formulario para registrar un nuevo libro
app.get("/new", (req, res) => {
  res.render("new");
});


// Crear y guardar un nuevo libro en la base de datos
app.post("/books", async (req, res) => {
  const book = new Book(req.body);

  await book.save();

  // Redirigir a la página principal para ver la lista actualizada
  res.redirect("/");
});


// Mostrar el formulario para editar la información de un libro existente
app.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);

  res.render("edit", { book });
});


// Actualizar los datos de un libro específico en la base de datos
app.put("/books/:id", async (req, res) => {
  await Book.findByIdAndUpdate(req.params.id, req.body);

  res.redirect("/");
});


// Eliminar un libro de la base de datos
app.delete("/books/:id", async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);

  res.redirect("/");
});



// INICIO DEL SERVIDOR

// Levantar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000 🚀");
}); 