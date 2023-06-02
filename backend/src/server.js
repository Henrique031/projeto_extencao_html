//importando o app do app.js
const app = require('./app.js');




require('dotenv').config();
const port = process.env.PORT || 3333;


//Vamos utilizar o método listen para ficar "escutando"(rodando) nosso servidor 
//O primeiro valor é da porta que vamos utilizar, a callback serve apenas para dar uma mensagem caso o servidor rode
app.listen(process.env.PORT, () => console.log(`SERVIDOR FUNCIONANDO NA PORTA ${port}`));