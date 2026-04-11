const userModel = require("../../models/userModel.js");

async function userExists(email){
  // Busca usuário no Database
  const userExist = await userModel.findByEmail(email);
  
  // Confere se existe usuário com aquele email
  if(userExist){
    throw{
      status: 409,
      message: "Já existe um usuário com este email!"
    };
  }
  
  return userExist;
}

module.exports = userExists;