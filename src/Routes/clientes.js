const express = require('express');
const router = express.Router();
const db = require('../Database/db');

// Obtener todos los clientes
router.get('/', (req, res) => {
  db.query('SELECT * FROM clientes', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Obtener un cliente por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM clientes WHERE idClientes = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(results[0]);
  });
});

// Crear un cliente
router.post('/', (req, res) => {
  const { NombreCliente, NombreCompañia, NumTelefonoCliente, EstadoCliente, MunicipioCliente, CpCliente, DireccionCliente } = req.body;
  const sql = `INSERT INTO clientes 
    (NombreCliente, NombreCompañia, NumTelefonoCliente, EstadoCliente, MunicipioCliente, CpCliente, DireccionCliente)
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [NombreCliente, NombreCompañia, NumTelefonoCliente, EstadoCliente, MunicipioCliente, CpCliente, DireccionCliente], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cliente creado', id: results.insertId });
  });
});

// Actualizar un cliente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { NombreCliente, NombreCompañia, NumTelefonoCliente, EstadoCliente, MunicipioCliente, CpCliente, DireccionCliente } = req.body;
  const sql = `UPDATE clientes SET 
    NombreCliente=?, NombreCompañia=?, NumTelefonoCliente=?, EstadoCliente=?, MunicipioCliente=?, CpCliente=?, DireccionCliente=?
    WHERE idClientes=?`;
  db.query(sql, [NombreCliente, NombreCompañia, NumTelefonoCliente, EstadoCliente, MunicipioCliente, CpCliente, DireccionCliente, id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cliente actualizado' });
  });
});

// Eliminar un cliente
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM clientes WHERE idClientes=?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Cliente eliminado' });
  });
});

module.exports = router;
