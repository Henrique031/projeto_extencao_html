//esse router js é como se fosse um pedaço do nosso app.js

const express = require('express');

//importando o router do express
const router = express.Router();

//importando o controller
const esportesController = require('./controllers/esportesController');


router.get('/esporte', esportesController.getAll);

router.post('/esporte/login', esportesController.postLogin);

router.post('/esporte/accountRegister', esportesController.postAccount);

router.post('/esporte/comentarios', esportesController.postComment);

router.get('/esporte/comentario/:id', esportesController.getComment); 

router.put('/esporte/update/:id', esportesController.putAccount);

router.delete('/esporte/delete/:id', esportesController.deleteAccount);

router.post('/esporte/:id/comentarios', esportesController.postCommentVinc);

module.exports = router;