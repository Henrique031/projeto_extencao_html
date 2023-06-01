    // Selecionar o botão de login
    var btnSignin = document.querySelector("#signin");

    // Selecionar o botão de cadastro
    var btnSignup = document.querySelector("#signup");
    
    // Selecionar o elemento body
    var body = document.querySelector("body");

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
          
          document.getElementById("nome-usuario").value = "";
          document.getElementById("email").value = "";
          document.getElementById("senha").value = "";

          return true
        }
        return false
    }
    
    // Adicionar um ouvinte de evento para o botão de login
    btnSignin.addEventListener("click", function () {
        // Adicionar a classe "sign-in-js" ao elemento body
        body.className = "sign-in-js";
    });
    
    // Adicionar um ouvinte de evento para o botão de cadastro
    btnSignup.addEventListener("click", function () {
        // Verifica si o email é válido
        verificarCadastro()
        // Adicionar a classe "sign-up-js" ao elemento body
        body.className = "sign-up-js";
    });
    