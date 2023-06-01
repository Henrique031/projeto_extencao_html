    // Selecionar o botão de login
    var btnSignin = document.querySelector("#signin");

    // Selecionar o botão de cadastro
    var btnSignup = document.querySelector("#signup");
    
    // Selecionar o elemento body
    var body = document.querySelector("body");
    
    // Adicionar um ouvinte de evento para o botão de login
    btnSignin.addEventListener("click", function () {
        // Adicionar a classe "sign-in-js" ao elemento body
        body.className = "sign-in-js";
    });
    
    // Adicionar um ouvinte de evento para o botão de cadastro
    btnSignup.addEventListener("click", function () {
        // Adicionar a classe "sign-up-js" ao elemento body
        body.className = "sign-up-js";
    });
    