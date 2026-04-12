const listTreatmentsService = require("../../services/treatment/listTreatmentsService.js");

async function listTreatmentsController(req, res) {
  try {

    const treatments = await listTreatmentsService();

    return res.status(200).json({
      success: true,
      message: "Serviços listados com sucesso!",
      data: treatments
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = listTreatmentsController;