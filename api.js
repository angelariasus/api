const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Variables de estado
let estado = false; // Valor recibido desde la placa
let aforo = 0; // Contador de personas
let puerta1 = 0; // Ángulo de la puerta 1
let puerta2 = 0; // Ángulo de la puerta 2
let subieron = 0; // Personas que subieron
let bajaron = 0; // Personas que bajaron

// Rutas de la API

// Obtener el estado
app.get("/estado", (req, res) => {
  res.json({ estado });
});

// Establecer el estado
app.post("/estado", (req, res) => {
  const { nuevoEstado } = req.body;
  if (typeof nuevoEstado === "boolean") {
    estado = nuevoEstado;
    subieron = 0; // Reiniciar los contadores al cambiar el estado
    bajaron = 0;
    res.json({ message: "Estado actualizado", estado });
  } else {
    res.status(400).json({ error: "Formato inválido. Se espera un booleano." });
  }
});

// Obtener el estado de las puertas
app.get("/puertas", (req, res) => {
  res.json({ puerta1, puerta2 });
});

// Establecer el estado de las puertas
app.post("/puertas", (req, res) => {
  const { nuevaPuerta1, nuevaPuerta2 } = req.body;
  if (typeof nuevaPuerta1 === "number" && typeof nuevaPuerta2 === "number") {
    puerta1 = nuevaPuerta1;
    puerta2 = nuevaPuerta2;
    res.json({ message: "Ángulos de las puertas actualizados", puerta1, puerta2 });
  } else {
    res.status(400).json({ error: "Formato inválido. Se esperan números." });
  }
});

// Recibir datos desde la placa
app.post("/datos", (req, res) => {
  const { aforo: nuevoAforo, subieron: nuevosSubieron, bajaron: nuevosBajaron } = req.body;

  if (
    typeof nuevoAforo === "number" &&
    typeof nuevosSubieron === "number" &&
    typeof nuevosBajaron === "number"
  ) {
    aforo = nuevoAforo;
    subieron = nuevosSubieron;
    bajaron = nuevosBajaron;
    res.json({
      message: "Datos actualizados",
      aforo,
      subieron,
      bajaron,
    });
  } else {
    res.status(400).json({ error: "Formato inválido. Verifique los datos enviados." });
  }
});

// Obtener los datos actuales
app.get("/datos", (req, res) => {
  res.json({
    aforo,
    puerta1,
    puerta2,
    estado,
    subieron,
    bajaron,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
