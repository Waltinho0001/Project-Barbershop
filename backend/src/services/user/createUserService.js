const userModel = require("../../models/userModel.js");
const userDataValidator = require("../../validators/user/userDataValidator.js");

// SERVICES
const userExists = require("./userExists.js");
const hashPassword = require("../auth/hashPassword.js");

async function createUserService(data){
  
  // Validação da entrada de dados 
  const erros = userDataValidator(data);
  if(erros.length > 0){
    throw {
      status: 400,
      message: "Erro na validação dos dados do usuário",
      erros
    };
  }
  
  // Confere se o usuário existe
  await userExists(data.email);
  
  // Criptografia da senha
  const hashedPassword = await hashPassword(data.password);
  
  // Criação do usuário
  const user = await userModel.createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    phone: data.phone || null,
    role: data.role || "client"
  });
  
  // OBS: NUNCA RETORNAR A SENHA
  delete user.password;
  
  return user;
}

module.exports = createUserService;