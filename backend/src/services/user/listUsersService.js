const userModel = require("../../models/userModel.js");

async function listUsersService() {
  
  // Busca todos usuários do Database
  const users = await userModel.findAll();

  // Evita retornar a senha de todos usuários
  const safeUsers = users.map(user => {
    delete user.password;
    return user;
  });

  return safeUsers;
}

module.exports = listUsersService;