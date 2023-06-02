const esporteModel = require('../models/esporte.js');
//nesse arquivo vai conter as funções que vão lá na nossa rota

const getAll = async (_request, response) => {
    const dadosUser = await esporteModel.getAll();
    // return response.status(200).json({dadosUser}.dadosUser[0]);
    return response.status(200).json({dadosUser});

};

//Funcao pra validação de login
const postLogin = async (request, response) => {
    let email = request.body.email;
    let senha = request.body.senha;
    let result;
    
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(email && senha){
        result = await esporteModel.postLogin(email, senha);
    }
    
    //Caso ocorra a validacao no banco, retorna o status
    if (result.length > 0) {
        // Informações de login válidas
        let id_perfil = await esporteModel.returnID(email, senha);
        response.status(200).json({id_perfil, message: 'Login válido' });
    } else {
        // Informações de login inválidas
        response.status(401).json({ message: 'Credenciais inválidas' });
    }
};

const postCommentVinc = async(request, response) => {
    
    let id = request.params.id;
    let comentario = request.body.comentarios;
    let result;
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(id && comentario){
        result = await esporteModel.postCommentVinc(id, comentario);
    }

    if(result){
        return response.status(200).json({message: 'Vinculado com sucesso' });
    }else{
        return response.status(400).json({message: 'Recurso não vinculado' });
    }
};


//Função pega informações de cadastro e passa pra função referente ao cadstro do perfil no banco de dados
const postAccount = async(request, response) => {
    let nome = request.body.nome;
    let email = request.body.email;
    let senha = request.body.senha;
    let result;
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(nome && email && senha){
        result = await esporteModel.postAccount(nome, email, senha);
    }
    
    if(result){
        return response.status(200).json({message: 'Cadastrado com sucesso' });
    }else{
        return response.status(400).json({message: 'Recurso não cadastrado' });
    }

};
   
//Função pega o comentario e joga pra função referente ao cadastro no banco de dados
const postComment = async(request, response) => {

    let comentarios = request.body.comentarios;
    let result;
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(comentarios){
        result = esporteModel.postComment(comentarios);
    }

    if(result){
        return response.status(200).json({message: 'Cadastrado com sucesso'});
    }else{
        return response.status(500).json({message: 'Recurso não cadastrado' });
    }
};

//Função pega o comentario referente ao ID do perfil
const getComment = async (request, response) => {

    let id = request.params.id;
    let result;
   
    if(id){
        result = await esporteModel.getComment(id);
    }
   
    if(result.length > 0){
        return response.status(200).json({result});
    }else{
        return response.status(404).json({message: 'Recurso solicitado não encontrado' });
    }
   
};


//Função pega ID e as informações enviadas e passam pra função de atualização do banco de dados.
const putAccount = async(request, response) => {

    let id = request.params.id;
    let email = request.body.email;
    let senha = request.body.senha;
    let result;
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(id && email && senha){
        result = await esporteModel.putAccount(id, email, senha);
    }

    if(result){
        return response.status(200).json({message: 'Atualizado com sucesso'});
    }else{
        return response.status(400).json({message: 'Recurso não atualizado' });
    }

};

//Pega o ID e passa pra função de deletar do banco de dados
const deleteAccount = async(request, response) => {

    let id = request.params.id;
    let result;
    //Validacao de dados e envio para funcao de manipulacao do banco de dados
    if(id){
        result = await esporteModel.deleteAccount(id);
    }

    if(result){
        return response.status(200).json({message: 'Deletado com sucesso'});
    }else{
        return response.status(500).json({message: 'Recurso não deletado' });
    }
   
};



module.exports = {
    getComment,
    postAccount,
    postComment,
    postCommentVinc,
    postLogin,
    putAccount,
    deleteAccount,
    getAll
};