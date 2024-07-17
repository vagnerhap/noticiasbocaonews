const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8000;

app.use(bodyParser.json({ limit: '10mb' }));

// Servir arquivos estáticos do diretório 'public'
app.use(express.static('public'));

// Rota para receber a imagem capturada
app.post('/upload', (req, res) => {
    const imgData = req.body.image.replace(/^data:image\/png;base64,/, '');
    const imgPath = path.join(__dirname, 'public', 'captured.png');
    
    fs.writeFile(imgPath, imgData, 'base64', (err) => {
        if (err) {
            console.error('Erro ao salvar a imagem:', err);
            res.status(500).send('Erro ao salvar a imagem.');
        } else {
            console.log('Imagem salva com sucesso.');
            res.status(200).send('Imagem salva com sucesso.');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://noticias.hsi:${PORT}`);
});
