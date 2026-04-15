const updateWorkingHoursService = require("../../services/workingHour/updateWorkingHoursService");

async function updateWorkingHoursController(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await updateWorkingHoursService(
      req.user,
      id,
      data
    );

    return res.status(200).json({
      success: true,
      message: "Horário atualizado com sucesso!",
      data: result
    });

  } catch (error) {
    next(error);
  }
}

module.exports = updateWorkingHoursController;