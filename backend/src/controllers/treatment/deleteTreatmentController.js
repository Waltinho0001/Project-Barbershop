const deleteTreatmentService = require("../../services/treatment/deleteTreatmentService.js");

async function deleteTreatmentController(req, res) {
  try {

    const { id } = req.params;

    const result = await deleteTreatmentService(id);

    return res.status(200).json({
      success: true,
      message: result.message
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = deleteTreatmentController;