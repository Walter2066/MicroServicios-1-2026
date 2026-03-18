const db = require("../db");
// GET todos
exports.getAll = (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const offset = (pageNum - 1) * limitNum;

  const query = "SELECT * FROM usuarios LIMIT ? OFFSET ?";

  db.query(query, [limitNum, offset], (err, results) => {
    if (err) {
      return res.status(500).json({
        transaccion: false,
        mensaje: "Error al obtener usuarios",
        data: err.message,
      });
    }

    res.status(200).json({
      transaccion: true,
      mensaje: "Usuarios obtenidos correctamente",
      data: {
        page: pageNum,
        limit: limitNum,
        resultados: results,
      },
    });
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
