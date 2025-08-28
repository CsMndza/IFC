const express = require('express');
const db = require('./src/Database/db'); 

const app = express();

const clientesRoutes = require('./src/Routes/clientes');


app.get("/", (req, res) => {
  res.send("¡Hola Mundo con conexión a BD!");
});

app.use("/clientes", clientesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
