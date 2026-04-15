const { query } = require("../../database/db");
const listAllWorkingHoursService = require("../../services/workingHour/deleteWorkingHoursService");

async function listAllWorkingHoursController(req, res, next) {
  try {
    const {barber_id} = req.query;

    const result = await listAllWorkingHoursService(req.user, barber_id);

    return res.status(200).json({
      success: true,
      message: "Horários listado com sucesso!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = listAllWorkingHoursController;
