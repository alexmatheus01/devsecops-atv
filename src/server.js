const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Aplicação funcionando!');
});

app.get('/produtos', (req, res) => {
    res.json([
        {
            id: 1,
            nome: 'Tablet',
            preco: 1800
        },
        {
            id: 2,
            nome: 'Celular',
            preco: 2000
        },
        {
            id: 3,
            nome: 'Fone de Ouvido',
            preco: 350
        }
    ]);
});

app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080');
});

setInterval(() => {
    console.log('Servidor continua ativo...');
}, 5000);