//arquivo que vai fazer conexão com o banco de dados

//importando o mysql
const mysql = require('mysql2/promise');
require('dotenv').config();
//verificando se o dotenv está fazendo o envio dos dados para conexão
// console.log(process.env.MYSQL_HOST);
// console.log( process.env.MYSQL_USER);
// console.log( process.env.MYSQL_PASSWORD);
// console.log( process.env.MYSQL_DB);




//vamos criar uma var que vai receber o mysql, vamos usar o método createPool que vai fazer uma lista de conexões e dentro dele vamos passar um objeto com configurações
const connection = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
});

module.exports = connection;

