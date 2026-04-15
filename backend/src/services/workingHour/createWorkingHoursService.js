const workingHoursModel = require("../../models/workingHoursModel.js");

// SERVICES
const workingHourExists = require("./workingHourExists.js");
const workingHourTimeValidator = require("../../validators/workingHour/workingHourTimeValidator.js");

async function createWorkingHourService(user, data){
  
  // Validação de Cargo
  if (user.role !== "barber" || user.role !== "barber" ){
    throw {
      status: 403,
      message: "Apenas barbeiros e Administradores podem agendsr horários"
    };
  }
  
  const barber_ID = user.id;
  
  // Verifica se existe Serviço naquele mesmo dia
  await workingHourExists(barber_ID, data.weekday);
  
  // Validação de Horário
  workingHourTimeValidator(data.start_time, data.end_time);
  
  return await workingHoursModel.create({
    barber_id,
    weekday: data.weekday,
    start_time: data.start_time,
    end_time: data.end_time
  });
}

module.exports = createWorkingHourService;