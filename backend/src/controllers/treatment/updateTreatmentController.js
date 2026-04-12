const updateTreatmentService = require("../../services/treatment/updateTreatmentService.js");

async function updateTreatmentController(req, res) {
  try {

    const { id } = req.params;

    const treatment = await updateTreatmentService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Serviço atualizado com sucesso!",
      data: treatment
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = updateTreatmentController;