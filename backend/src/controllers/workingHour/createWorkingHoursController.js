const createWorkingHoursService = require("../../services/workingHour/createWorkingHoursService.js");

async function createWorkingHoursController(req, res, next) {
  try {
    const result = await createWorkingHoursService(req.user, req.body);

    return res.status(201).json({
      success: true,
      message: "Horário criado com sucesso!",
      data: treatment,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = createWorkingHoursController;
