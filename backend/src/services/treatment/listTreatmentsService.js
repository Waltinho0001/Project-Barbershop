const treatmentModel = require("../../models/treatmentModel.js");

async function listTreatmentsService() {

  const treatments = await treatmentModel.findAll();

  return treatments;
}

module.exports = listTreatmentsService;