const treatmentModel = require("../../models/treatmentModel.js");

async function treatmentExists(email){
  // Busca usuário no Database
  const treatmentExist = await treatmentModel.findByEmail(name);
  
  // Confere se existe usuário com aquele email
  if(treatmentExist){
    throw{
      status: 409,
      message: "Já existe um serviço com este nome!"
    };
  }
  
  return treatmentExist;
}

module.exports = treatmentExists;