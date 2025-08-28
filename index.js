// index.js
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("¡Hola desde Express!");
});

app.get("/josu", (req, res) => {
  res.send("¡Hola josu!");
});


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
