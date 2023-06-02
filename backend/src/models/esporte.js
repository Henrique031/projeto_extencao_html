//Aqui teria todas as funções que mexeriam diretamente com o banco de dados

//como essa função vai estar ligada diretamente com o banco de dados, vamos importar ele aqui
const connection = require('./connection');

const getAll = async () => {
   
    const [dadosUser] = await connection.execute('SELECT * FROM perfil');
    return dadosUser;

};

//Funcao para retornar os valores para validacao do login
const postLogin = async (email, senha) => {

    const [validacao] = await connection.execute('SELECT * FROM perfil WHERE email = ? AND senha = ?', [email, senha]);

    return validacao;
};

const returnID = async (email, senha) => {
    // Executa a query
    const [result] = await connection.execute(
        'SELECT id FROM perfil WHERE email = ? AND senha = ?',
        [email, senha]
    );

    return result[0];
};

//Funcao para vincular o Usuario com os Comentarios que fizer
const postCommentVinc = async (id, comentario) => {
   
    //Verificar se tem a conta no banco de dados
    const [conta] = await connection.execute(
        'SELECT * FROM perfil WHERE id = ?',
        [id]
    );

    if(conta[0].id == undefined){
        return;
    }
    //Verificar se o comentario no banco de dados
    const [comentarios] = await connection.execute(
        'SELECT * FROM comentarios WHERE comentarios = ?',
        [comentario]
    );

    if(comentarios[0].id == undefined){
        return;
    }
    //faz o vinculo do comentario pelo ID
    const [vinculoComentario] = await connection.execute(
        'INSERT INTO perfil_comentario (comentarios_id, perfil_id) VALUES (?, ?)',
        [comentarios[0].id, conta[0].id]
    );
    
    return vinculoComentario;
};

//Funcao para cadastrar os dados do usuario no banco
const postAccount = async (nome, email, senha) => {
    // Executa a query
    const [result] = await connection.execute(
        'INSERT INTO perfil (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senha]
    );
      
    // Retorna o ID do registro inserido
    return result;
};
 
//Funcao pra cadastrar o comentario no banco
const postComment = async (comentarios) => {
    //Executa query
    const [comment] = await connection.execute(
        'INSERT INTO comentarios (comentarios) VALUES (?)',
        [comentarios]
    );
     
    return comment;
};
//Funcao para retornar todos os comentarios do usuario
const getComment = async (id) => {
    //Executa query e armazena na variavel
    const [perfilComentario] = await connection.execute(
        'SELECT * FROM perfil_comentario WHERE perfil_id = ?',
        [id]
    );
    
    const comentarios = [];
    //Foreach que repete a Query e pega as informações dos comentarios com base no ID do comentario
    for (const item of perfilComentario) {
        const comentarioId = item.comentarios_id;
        const [comentario] = await connection.execute(
            'SELECT * FROM comentarios WHERE id = ?',
            [comentarioId]
        );
        comentarios.push(comentario[0]);
    }
    
    return comentarios;
};


//Funcao para atualizar os dados no banco
const putAccount = async (id, email, senha) => {
    //Executa query
    const [result] = await connection.execute(
        'UPDATE perfil SET email = ?, senha = ? WHERE id = ?',
        [email, senha, id]
    );
    
    return result;
};

//Funcao para deletar o usuario do banco
const deleteAccount = async (id) => {
    //Executa query
    const [result] = await connection.execute(
        'DELETE FROM perfil WHERE id = ?',
        [id]
    );
    return result;
};


module.exports = {
    getComment,
    postAccount,
    postComment,
    postCommentVinc,
    postLogin,
    putAccount,
    deleteAccount,
    getAll,
    returnID
};