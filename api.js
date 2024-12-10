// Importar dependencias
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Configuración del servidor
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Variables para almacenar los datos
let entradas = 0;
let salidas = 0;
let puerta1 = 0; // Estado inicial de la puerta 1
let puerta2 = 0; // Estado inicial de la puerta 2

// Endpoint para recibir datos desde la ESP32
app.post("/datos", (req, res) => {
  const { entradas: newEntradas, salidas: newSalidas, puerta1: newPuerta1, puerta2: newPuerta2 } = req.body;

  if (newEntradas !== undefined) entradas = newEntradas;
  if (newSalidas !== undefined) salidas = newSalidas;
  if (newPuerta1 !== undefined) puerta1 = newPuerta1;
  if (newPuerta2 !== undefined) puerta2 = newPuerta2;

  console.log(`Datos recibidos: Entradas = ${entradas}, Salidas = ${salidas}, Puerta1 = ${puerta1}, Puerta2 = ${puerta2}`);

  res.status(200).json({ message: "Datos recibidos correctamente" });
});

// Endpoint para enviar los datos actuales a la ESP32
app.get("/datos", (req, res) => {
  res.status(200).json({ entradas, salidas, puerta1, puerta2 });
});

// Endpoint para actualizar los estados de las puertas desde la web
app.post("/puertas", (req, res) => {
  const { puerta1: newPuerta1, puerta2: newPuerta2 } = req.body;

  if (newPuerta1 !== undefined) puerta1 = newPuerta1;
  if (newPuerta2 !== undefined) puerta2 = newPuerta2;

  console.log(`Puertas actualizadas: Puerta1 = ${puerta1}, Puerta2 = ${puerta2}`);

  res.status(200).json({ message: "Puertas actualizadas correctamente", puerta1, puerta2 });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
