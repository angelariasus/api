const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Variables para almacenar los datos
let datos = {
  entradas: 0,
  salidas: 0,
  puerta1: 0, // Ejemplo: puede representar grados del servo
  puerta2: 0  // Ejemplo: puede representar grados del servo
};

// Ruta para recibir datos desde la placa
app.post('/datos', (req, res) => {
  const { entradas, salidas } = req.body;

  if (typeof entradas !== 'undefined') datos.entradas = entradas;
  if (typeof salidas !== 'undefined') datos.salidas = salidas;

  console.log('Datos recibidos de la placa:', req.body);
  res.json({ message: 'Datos recibidos correctamente', datos });
});

// Ruta para enviar datos desde la web a la placa
app.get('/datos', (req, res) => {
  res.json(datos);
});

// Ruta para actualizar los valores de puerta1 y puerta2 desde la web
app.post('/actualizar-puertas', (req, res) => {
  const { puerta1, puerta2 } = req.body;

  if (typeof puerta1 !== 'undefined') datos.puerta1 = puerta1;
  if (typeof puerta2 !== 'undefined') datos.puerta2 = puerta2;

  console.log('Datos de puertas actualizados desde la web:', req.body);
  res.json({ message: 'Puertas actualizadas correctamente', datos });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
