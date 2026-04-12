const treatmentModel = require("../../models/treatmentModel.js");
const treatmentDataValidator = require("../../validators/treatment/treatmentDataValidator.js");

// SERVICES
const treatmentExists = require("./treatmentExists.js");

async function createTreatmentService(data){
  
  // Normalização
  data.name = data.name.trim().toLowerCase();
  
  // Validação dos erros
  const erros = treatmentDataValidator(data);
  
  if (errors.length > 0) {
    throw {
      status: 400,
      message: "Falha de validação",
      errors
    };
  }
  
  // Confere se existe serviço
  await treatmentExists(data.name);
  
  // Cria serviço
  const treatment = treatmentModel.create(data);
  
  return treatment;
}

module.exports = createTreatmentService;