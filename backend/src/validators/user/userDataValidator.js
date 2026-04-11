const regexEmail = require("./regexEmail.js");

function userDataValidator(data){
  const errors = [];
  
  // NOME
  if(!data.name || typeof data.name !== String){
    error.push("O nome é obrigatório");
  }else if(data.name.length < 3){
    error.push("O nome precisa possuir mais que 3 digitos!");
  }
  
  
  // EMAIL
  if(!data.email || typeof data.email !== String){
    error.push("O email é obrigatório");
  }else if(!regexEmail(data.email)){
    error.push("Email inválido");
  }
  
  
  // NÚMERO
  if (data.phone) {
    const cleanPhone = data.phone.replace(/\D/g, ""); // Limpa o N° digitado
    
    // TELEFONE FIXO & CELULAR
    if (cleanPhone.length < 10 || cleanPhone.length > 11){ errors.push("Telefone deve ter entre 10 e 11 dígitos");
    }
  }
  
  
  // SENHA
  if(!data.password){
    errors.push("A senha é obrigatória");
  }else if(data.password.length < 8){
    errors.push("A senha deve conter mais que 8 digitos");
  }
  
  
  // CARGO ( CLIENTE, BARBEIRO, ADMIN )
  const validRoles = ["client", "barber", "admin"];
  
  if(!data.role && !validRoles.includes(data.role)){
    error.push("Cargo inválido!");
  }
}

module.exports = userDataValidator;