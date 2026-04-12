const createTreatmentService = require("../../services/treatment/createTreatmentService.js");

async function createTreatmentController(req, res) {
  try {
    const treatment = await createTreatmentService(req.body);

    return res.status(201).json({
      success: true,
      message: "Serviço criado com sucesso!",
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

module.exports = createTreatmentController;