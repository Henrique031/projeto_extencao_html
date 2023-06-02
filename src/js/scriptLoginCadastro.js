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
let id_do_usuario;

//Evento para enviar os dados do usuario para validação no backend e retornar positivo ou negativo para o login
botaoSignIN.addEventListener("click", function(event) {
  //Impede que o botão atualize a pagina
  event.preventDefault()
  //Manipulação de dados do usuario
  const emailInput = document.querySelector("#input-email-cadastrado").value;
  const senhaInput = document.querySelector("#input-senha-cadastrado").value;

  //If para validar campos em branco e não enviar os dados pro fetch
  if(emailInput === '' || senhaInput === ''){
    let valorOriginal = botaoSignIN.innerHTML;
      botaoSignIN.innerHTML = "Inválido!"

      setTimeout(function() {
        botaoSignIN.innerHTML = valorOriginal;
      }, 2000);
    return;
  }

  const data = {
    email: emailInput,
    senha: senhaInput
  };

  //envio de dados do usuario para API e retorna se é valido ou invalido
  fetch('http://localhost:3000/esporte/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response =>{
    //Em caso de login invalido/Acesso negado retorna Invalido no botao
    if (response.status === 401) {
      let valorOriginal = botaoSignIN.innerHTML;
      botaoSignIN.innerHTML = "Inválido!"

      setTimeout(function() {
        botaoSignIN.innerHTML = valorOriginal;
      }, 2000);

    } else {
      return response.json();
    }
  })
  .then(result => {
    id_do_usuario = result.id_perfil.id; //Valor do ID do usuario que sera utilizado em todo o site enquanto estiver logado
    localStorage.setItem('meuValor', String(id_do_usuario)); // Armazena o valor da variavel no localStorage do navegador para ser utilizado em outros arquivos
    
    //Verificação caso o login seja valido ou invalido, passando para pagina principal se for valido
    if(result.message == 'Login válido'){

       //Limpa os dados do usuario dos campos
        document.querySelector("#input-email-cadastrado").value = "";
        document.querySelector("#input-senha-cadastrado").value = "";
      //Passa para pagina principal 1 seg após validação do login
      setTimeout(() =>{
        window.location.href = '../../+EsportePrincipal.html'; 
      }, 1000)
    }
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });

 
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
    
    if(result.message == 'Cadastrado com sucesso'){
      //Transição para o Login apos cadastrar com sucesso
      setTimeout(() =>{
        body.className = "sign-in-js";
      }, 2000)
    }
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

    //Validação dos campos em branco para definir mensagem "Dados incompletos"
    if(usuario === '' || email === '' || senha === ''){
      let valorOriginal = mensagem.innerHTML;

      mensagem.innerHTML = 'Dados Incompletos'

      mensagem.style.backgroundColor = 'red';

      mensagem.classList.remove("mensagem-escondida");
      mensagem.classList.add("mensagem-aparecendo");
      
      setTimeout(function() {
        mensagem.classList.remove("mensagem-aparecendo");
        mensagem.classList.add("mensagem-escondida");
       
      }, 1000);

      setTimeout(function() {
        mensagem.innerHTML = valorOriginal;
        mensagem.style.backgroundColor = '';
      },2000)
     
    }
     //Validação dos campos em branco para definir mensagem "Cadastrado com Sucesso"
    if (/\S+@\S+\.\S+/.test(email) && usuario && senha) {
      mensagem.classList.remove("mensagem-escondida");
      mensagem.classList.add("mensagem-aparecendo");
      
      setTimeout(function() {
        mensagem.classList.remove("mensagem-aparecendo");
        mensagem.classList.add("mensagem-escondida");
      }, 1000);

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
    // Adicionar a classe "sign-up-js" ao elemento body
    body.className = "sign-up-js";
});

