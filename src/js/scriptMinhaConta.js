
let id = localStorage.getItem('meuValor');
let id_do_usuario = parseInt(id);


var btSalvar = document.querySelector("#btSalvar")

//Fetch para pegar as informacoes referente ao ID do usuario na pagina
fetch('http://localhost:3000/esporte')
.then(response => response.json())
.then(data => {
  // Obtém as referências dos elementos de input
  const objetoEncontrado = data.dadosUser.find(objeto => objeto.id === id_do_usuario);

  document.getElementById('name').value = objetoEncontrado.nome;
  document.getElementById('email').value = objetoEncontrado.email;
  document.getElementById('password').value = objetoEncontrado.senha;
  
})
.catch(error => {
  console.error('Ocorreu um erro:', error);
});


//Evento para editar as informacoes do email e senha
btSalvar.addEventListener("click", function() {
  //Manipulação de dados do usuario
  const novoEmail = document.getElementById('editEmail').value;
  const novoPassword = document.getElementById('editPassword').value;

  const data = {
    email: novoEmail,
    senha: novoPassword
  };
  
  //envio de dados do usuario para API e retorna se é valido ou invalido
  fetch(`http://localhost:3000/esporte/update/${id_do_usuario}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
});


// Função para abrir a modal de edição do perfil
function editProfile() {
  // Mostra a modal através da alteração do display para 'block'
  document.getElementById('editProfileModal').style.display = 'block';
  // Define os valores dos campos de email e senha da modal de acordo com os valores atuais na página
  document.getElementById('editEmail').value = document.getElementById('email').value;
  document.getElementById('editPassword').value = document.getElementById('password').value;
}

// Função para fechar a modal de edição do perfil
function cancelEdit() {
  // Esconde a modal através da alteração do display para 'none'
  document.getElementById('editProfileModal').style.display = 'none';
}


// Função para salvar as alterações feitas na edição do perfil
function saveChanges() {
  
  // Obtém os novos valores informados nos campos de email e senha na modal
  var novoEmail = document.getElementById('editEmail').value;
  var novoPassword = document.getElementById('editPassword').value;

  // Define os valores de email e senha na página de acordo com os novos valores informados na modal
  document.getElementById('email').value = novoEmail;
  document.getElementById('password').value = novoPassword;
  // Fecha a modal
  cancelEdit();
}


// Função para deletar a conta do usuário
function deleteAccount() {
  // Exibe um alerta para confirmar se o usuário realmente deseja deletar sua conta
  if (confirm('Tem certeza que deseja deletar sua conta?')) {
    
    fetch(`http://localhost:3000/esporte/delete/${id_do_usuario}`, {
    method: 'DELETE'
    })
    .then(response => response.json())
    .then(result => {
      console.log('Resposta da API:', result.message);
    })
    .catch(error => {
      console.error('Ocorreu um erro:', error);
    });

    alert('Sua conta foi deletada!');

    window.location.href = '../../+EsporteLoginCadastro.html'; 
  }
}

