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
    // Adicionar lógica para efetivamente deletar a conta do usuário
    alert('Sua conta foi deletada!');
  }
}

  