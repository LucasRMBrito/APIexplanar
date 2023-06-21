const express = require('express');
const routes = require('./routes');
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", '*');
    res.header("Access-Control-Allow-Headers", "Content-type");
    res.header("Access-Control-Allow-Credentials", true);
    app.use(cors());
    next();
});

app.use(express.json());
app.use(routes);

module.exports = app;

//instanciando o express