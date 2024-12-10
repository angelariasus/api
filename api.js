const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

let sistema = {
    aforo: 0,
    estadoBus: false,
    puerta1: 0,
    puerta2: 0,
    subieron: 0,
    bajaron: 0
};

app.use(bodyParser.json());

app.get('/datos', (req, res) => {
    res.json(sistema);
});

app.post('/command', (req, res) => {
    const { estado } = req.body;
    sistema.estadoBus = estado;
    sistema.subieron = 0;
    sistema.bajaron = 0;
    console.log('Bus activado:', estado);

    res.status(200).send({ success: true });
});

app.post('/control', (req, res) => {
    const { puerta1, puerta2 } = req.body;

    if (puerta1 !== undefined) sistema.puerta1 = puerta1;
    if (puerta2 !== undefined) sistema.puerta2 = puerta2;

    console.log('Puertas actualizadas:', sistema);

    res.status(200).send({ success: true });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
