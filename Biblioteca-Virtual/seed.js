const Book = require("./models/book");

async function seedBooks() {
  try {
    const count = await Book.countDocuments();

    if (count === 0) {

      await Book.insertMany([
        {
          title: "Clean Code",
          author: "Robert C. Martin",
          price: 45,
          category: "Programación"
        },
        {
          title: "El Principito",
          author: "Antoine de Saint-Exupéry",
          price: 20,
          category: "Novela"
        },
        {
          title: "The Pragmatic Programmer",
          author: "Andrew Hunt",
          price: 50,
          category: "Programación"
        },
        {
          title: "Cien Años de Soledad",
          author: "Gabriel García Márquez",
          price: 30,
          category: "Realismo mágico"
        },
        {
          title: "Don Quijote de la Mancha",
          author: "Miguel de Cervantes",
          price: 35,
          category: "Clásico"
        },
        {
          title: "Atomic Habits",
          author: "James Clear",
          price: 28,
          category: "Desarrollo personal"
        },
        {
          title: "Sapiens: De animales a dioses",
          author: "Yuval Noah Harari",
          price: 40,
          category: "Historia"
        },
        {
          title: "Harry Potter y la piedra filosofal",
          author: "J.K. Rowling",
          price: 25,
          category: "Fantasía"
        },
        {
          title: "1984",
          author: "George Orwell",
          price: 22,
          category: "Ciencia ficción"
        },
        {
          title: "El Alquimista",
          author: "Paulo Coelho",
          price: 18,
          category: "Novela"
        }
      ]);

      console.log("10 libros de prueba creados correctamente");
    }

  } catch (error) {
    console.error("Error ejecutando seed:", error);
  }
}

module.exports = seedBooks;