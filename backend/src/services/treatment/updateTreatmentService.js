const treatmentModel = require("../../models/treatmentModel.js");
const treatmentDataValidator = require("../../validators/treatment/treatmentDataValidator.js.js");

async function updateTreatmentService(id, data) {

  // validar ID
  if (isNaN(id)) {
    throw {
      status: 400,
      message: "ID inválido"
    };
  }
  
  // Busca o serviço no database
  const treatment = await treatmentModel.findById(id);

  if (!treatment) {
    throw {
      status: 404,
      message: "Serviço não encontrado"
    };
  }

  // normalizar nome
  if (data.name) {
    data.name = data.name.trim().toLowerCase();
  }

  // validar dados
  const errors = treatmentDataValidator(data);

  if (errors.length > 0) {
    throw {
      status: 400,
      message: "Erro de validação",
      errors
    };
  }

  // evitar duplicação
  if (data.name) {
    const exists = await treatmentModel.findByName(data.name);

    if (exists && exists.id != id) {
      throw {
        status: 400,
        message: "Nome já está em uso"
      };
    }
  }

  const updated = await treatmentModel.update(id, data);

  return updated;
}

module.exports = updateTreatmentService;