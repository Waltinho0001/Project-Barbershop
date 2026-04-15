const deleteWorkingHoursService = require('../../services/workingHour/deleteWorkingHoursService');

async function deleteWorkingHoursController(req, res, next) {
  try {
    const result = await deleteWorkingHoursService(req.user, req.params.id);
    
    return res.status(200).json({
        success: true,
        message: "Horário deletado com sucesso!",
        data: result
    });
}catch (error) {
    next(error);
}
}

module.exports = deleteWorkingHoursController;