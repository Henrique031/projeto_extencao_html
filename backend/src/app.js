//importando o express para auxiliar em requisições HTTP
const express = require('express');
//importando o cors
const cors = require('cors');
//importando nosso router 
const router = require('./router');
//Atribuindo o express ao app
const app = express();
//utilizando a função abaixo para o json
app.use(express.json());
//utilizando o cors
app.use(cors());
//colocando o app para usar o router
app.use(router);

//exportando o app
module.exports = app;