const userModel = require("../../models/userModel.js");

async function deleteUserService(id) {
  
  // Busca usuário no Database
  const user = await userModel.findById(id);
  
  if (!user) {
    throw {
      status: 404,
      message: "Usuário não encontrado"
    };
  }
  
  // Deleta usuário
  await userModel.remove(id);

  return { message: "Usuário deletado com sucesso" };
}

module.exports = deleteUserService;