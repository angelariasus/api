// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let aforo = 0;
let puerta1 = 0;
let puerta2 = 0;
let estado = false;
let subieron = 0;
let bajaron = 0;

app.use(bodyParser.json());

// Endpoint para recibir datos desde la placa Arduino y actualizar el estado
app.post('/datos', (req, res) => {
  const data = req.body;

  aforo = data.aforo || aforo;
  puerta1 = data.puerta1 || puerta1;
  puerta2 = data.puerta2 || puerta2;
  estado = data.estado || estado;
  subieron = data.subieron || subieron;
  bajaron = data.bajaron || bajaron;

  console.log('Datos recibidos:');
  console.log(`Aforo: ${aforo}`);
  console.log(`Puerta1: ${puerta1}`);
  console.log(`Puerta2: ${puerta2}`);
  console.log(`Estado: ${estado}`);
  console.log(`Subieron: ${subieron}`);
  console.log(`Bajaron: ${bajaron}`);

  res.status(200).json({
    aforo,
    puerta1,
    puerta2,
    estado,
    subieron,
    bajaron
  });
});

// Endpoint para enviar datos a la placa Arduino
app.get('/datos', (req, res) => {
  res.status(200).json({
    aforo,
    puerta1,
    puerta2,
    estado,
    subieron,
    bajaron
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
