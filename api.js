const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Variables de estado
let aforo = 0; // Contador actual de personas en el bus
let subieron = 0; // Personas que subieron cuando estado es true
let bajaron = 0; // Personas que bajaron cuando estado es true
let estado = false; // Indica si el bus está detenido
let puerta1 = 0; // Ángulo de la puerta 1
let puerta2 = 0; // Ángulo de la puerta 2

// Ruta GET para obtener el estado actual
app.get('/datos', (req, res) => {
  res.json({
    aforo,
    subieron,
    bajaron,
    estado,
    puerta1,
    puerta2,
  });
});

// Ruta POST para actualizar el estado del bus
app.post('/datos', (req, res) => {
  const { contadorNuevo, estadoLedNuevo, estadoLedBNuevo } = req.body;

  // Actualizar el estado del bus
  if (contadorNuevo !== undefined) aforo = contadorNuevo;
  if (estadoLedNuevo !== undefined) {
    estado = estadoLedNuevo === "Encendido";
  }

  // Resetear subidas y bajadas si el estado cambia a false
  if (!estado) {
    subieron = 0;
    bajaron = 0;
  }

  // Simulación de control de puertas (puerta 1 y 2)
  if (estado) {
    if (aforo < 10) {
      puerta1 = 90;
      puerta2 = 90;
    } else {
      puerta1 = 0;
      puerta2 = 0;
    }
  } else {
    puerta1 = 0;
    puerta2 = 0;
  }

  res.json({
    message: "Estado actualizado",
    aforo,
    subieron,
    bajaron,
    estado,
    puerta1,
    puerta2,
  });
});

// Ruta POST para entradas y salidas
app.post('/movimiento', (req, res) => {
  const { direccion } = req.body; // "subida" o "bajada"

  if (estado) {
    if (direccion === 'subida') {
      subieron++;
      aforo++;
    } else if (direccion === 'bajada') {
      bajaron++;
      aforo--;
    }
  }

  res.json({
    message: "Movimiento registrado",
    aforo,
    subieron,
    bajaron,
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
