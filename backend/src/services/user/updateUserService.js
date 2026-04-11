const userModel = require("../../models/userModel.js");

async function updateUserService(id, data) {
  
  // Busca o usuário no Database
  const user = await userModel.findById(id);
  
  if (!user) {
    throw {
      status: 404,
      message: "Usuário não encontrado"
    };
  }
  
  // Confere se existe usuário com aquele email
  if (data.email) {
    const emailExists = await userModel.findByEmail(data.email);
    
    if (emailExists && emailExists.id != id) {
      throw {
        status: 400,
        message: "Email já está em uso"
      };
    }
  }
  
  // Atualiza o usuário
  const updatedUser = await userModel.update(id, data);
  
  delete updatedUser.password; // Evita retornar a senha

  return updatedUser;
}

module.exports = updateUserService;