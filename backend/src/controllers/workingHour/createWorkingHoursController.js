const createWorkingHoursService = require('../../services/workingHour/createWorkingHoursService.js');

async function createWorkingHoursController(req, res, next) {
  try {
    const result = await createWorkingHoursService(
      req.user,
      req.body
    );
    
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

module.exports = createWorkingHoursController;