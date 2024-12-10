// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

let aforo = 0;
let estadoBus = false;
let puerta1 = 0;
let puerta2 = 0;
let subieron = 0;
let bajaron = 0;

app.use(bodyParser.json());

app.post('/command', (req, res) => {
  const { estado } = req.body;
  console.log(`Comando para cambiar el bus a: ${estado}`);
  estadoBus = estado;
  res.status(200).send('Comando ejecutado');
});

app.post('/control', (req, res) => {
  const { puerta1: ang1, puerta2: ang2 } = req.body;
  console.log(`Actualización ángulos: puerta1=${ang1}, puerta2=${ang2}`);

  puerta1 = ang1;
  puerta2 = ang2;

  res.status(200).send('Actualización control');
});

app.get('/datos', (req, res) => {
  res.status(200).json({
    aforo,
    estadoBus,
    puerta1,
    puerta2,
    subieron,
    bajaron
  });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
