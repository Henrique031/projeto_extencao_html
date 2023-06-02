// Selecionar o botão de login
var btnSignIn = document.querySelector("#signin");

// Selecionar o botão de cadastro
var btnSignUp = document.querySelector("#signup");

// Selecionar o elemento body
var body = document.querySelector("body");

//Seleciona o botao de login
var botaoSignIN = document.querySelector("#login");
//Seleciona o botao de cadastrar
var botaoSignUP = document.querySelector("#cadastrar")

let id_do_usuario; //VARIAVEL QUE PRECISA VIR DA BotaoSignIN.addEventListener fora do escopo pra ser global

//Evento para enviar os dados do usuario para validação no backend e retornar positivo ou negativo para o login
botaoSignIN.addEventListener("click", function(event) {
  //Impede que o botão atualize a pagina
  event.preventDefault()
  //Manipulação de dados do usuario
  const emailInput = document.querySelector("#input-email-cadastrado");
  const senhaInput = document.querySelector("#input-senha-cadastrado");

  const data = {
    email: emailInput.value,
    senha: senhaInput.value
  };
  //envio de dados do usuario para API e retorna se é valido ou invalido
  fetch('http://localhost:3000/esporte/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Resposta da API:', result.message);
    id_do_usuario = result.id_perfil.id; //VALOR DA VARIAVEL SAI DESTE PONTO APOS A O USUARIO APERTAR O BOTAO DE LOGIN

    if(result.message == 'Login válido'){
      setTimeout(() =>{
        window.location.href = '../../+EsportePrincipal.html';
      }, 1500)
    }
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

  //Limpa os dados do usuario dos campos
  document.querySelector("#input-email-cadastrado").value = "";
  document.querySelector("#input-senha-cadastrado").value = "";
});

//Evento para cadastrar os dados do usuario no banco de dados
botaoSignUP.addEventListener("click", function(event) {
  //Impede que o botão atualize a pagina
  event.preventDefault()

  //Manipulação de dados do usuario
  const nomeInput = document.querySelector("#nome-usuario");
  const emailInput = document.querySelector("#email");
  const senhaInput = document.querySelector("#senha");
  
  const data = {
    nome: nomeInput.value,
    email: emailInput.value,
    senha: senhaInput.value
  };

  //envio de dados do usuario para API e retorna se foi cadastrado ou não
  fetch('http://localhost:3000/esporte/AccountRegister', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Resposta da API:', result.message);
      setTimeout(() =>{
        body.className = "sign-in-js";;
      }, 2000)
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

  //Limpa os dados do usuario dos campos
  document.getElementById("nome-usuario").value = "";
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";

});


// Validar cadastro
function verificarCadastro() {
    var usuario = document.getElementById("nome-usuario").value;
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;
    var mensagem = document.getElementById("mensagem");
    
    if (/\S+@\S+\.\S+/.test(email) && usuario && senha) {
      mensagem.classList.remove("mensagem-escondida");
      mensagem.classList.add("mensagem-aparecendo");
      
      setTimeout(function() {
        mensagem.classList.remove("mensagem-aparecendo");
        mensagem.classList.add("mensagem-escondida");
      }, 2000);
      // return true
    }
    // return false
}

// Adicionar um ouvinte de evento para o botão de login
btnSignIn.addEventListener("click", function () {
    // Adicionar a classe "sign-in-js" ao elemento body
    body.className = "sign-in-js";
});

// Adicionar um ouvinte de evento para o botão de cadastro
btnSignUp.addEventListener("click", function () {
    // Verifica si o email é válido
    verificarCadastro()
    // Adicionar a classe "sign-up-js" ao elemento body
    body.className = "sign-up-js";
});

