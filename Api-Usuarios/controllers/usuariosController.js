const db = require("../db");
// GET todos
exports.getAll = (req, res) => {
  const { edad } = req.query;

  let query = "SELECT * FROM usuarios";
  let params = [];

  // Si viene filtro por edad
  if (edad) {
    query += " WHERE edad = ?";
    params.push(edad);
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(200).json(results);
  });
};
// GET por ID
exports.getById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json(results[0]);
  });
};
// POST crear
exports.create = (req, res) => {
  const { nombre, email, edad, telefono } = req.body;

  if (!email) {
    return res.status(400).json({ mensaje: "El email es obligatorio" });
  }

  if (!edad || edad <= 0) {
    return res.status(400).json({ mensaje: "La edad debe ser mayor a 0" });
  }

  db.query(
    "INSERT INTO usuarios (nombre, email, edad, telefono) VALUES (?, ?, ?, ?)",
    [nombre, email, edad, telefono],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.status(201).json({
        mensaje: "Usuario creado correctamente",
        id: result.insertId,
      });
    },
  );
};

// PUT actualizar
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, email, edad, telefono } = req.body;

  // 🔴 Validaciones
  if (!email) {
    return res.status(400).json({ mensaje: "El email es obligatorio" });
  }

  if (!edad || edad <= 0) {
    return res.status(400).json({ mensaje: "La edad debe ser mayor a 0" });
  }

  db.query(
    "UPDATE usuarios SET nombre=?, email=?, edad=?, telefono=? WHERE id=?",
    [nombre, email, edad, telefono, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensaje: "Usuario no encontrado" });
      }

      res.status(200).json({ mensaje: "Actualizado correctamente" });
    },
  );
};

// DELETE eliminar
exports.delete = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM usuarios WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.status(200).json({ mensaje: "Eliminado correctamente" });
  });
};
