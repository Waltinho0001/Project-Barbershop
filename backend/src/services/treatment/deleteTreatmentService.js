const treatmentModel = require("../../models/treatmentModel.js");

async function deleteTreatmentService(id) {

  if (isNaN(id)) {
    throw {
      status: 400,
      message: "ID inválido"
    };
  }

  const treatment = await treatmentModel.findById(id);

  if (!treatment) {
    throw {
      status: 404,
      message: "Serviço não encontrado"
    };
  }

  await treatmentModel.remove(id);

  return { message: "Serviço deletado com sucesso" };
}

module.exports = deleteTreatmentService;