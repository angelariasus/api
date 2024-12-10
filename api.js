const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Variables globales para almacenar datos
let aforo = 0;
let estado = false; // Estado inicial (puerta cerrada)
let puerta1 = 0; // Ángulo de la puerta 1
let puerta2 = 0; // Ángulo de la puerta 2
let subieron = 0;
let bajaron = 0;

// Endpoint para recibir datos del ESP32
app.post('/datos', (req, res) => {
  const { aforo: nuevoAforo, puerta1: nuevaPuerta1, puerta2: nuevaPuerta2, estado: nuevoEstado, subieron: nuevosSubieron, bajaron: nuevosBajaron } = req.body;

  aforo = nuevoAforo || aforo;
  puerta1 = nuevaPuerta1 || puerta1;
  puerta2 = nuevaPuerta2 || puerta2;
  estado = nuevoEstado !== undefined ? nuevoEstado : estado;
  subieron = nuevosSubieron || subieron;
  bajaron = nuevosBajaron || bajaron;

  console.log('Datos recibidos del ESP32:', req.body);
  res.status(200).send({ message: 'Datos recibidos exitosamente' });
});

// Endpoint para enviar datos al ESP32
app.get('/datos', (req, res) => {
  res.status(200).send({
    estado,
  });
});

// Servidor en escucha
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
