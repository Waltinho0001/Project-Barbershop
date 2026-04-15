const workingHoursModel = require("../../models/workScheduleModel");

// SERVICES
const workingHourTimeValidator = require("../../validators/workingHour/workingHourTimeValidator.js");

async function updateWorkingHoursService(user, id, data) {
  // Busca o usuário no Database
  const workingHour = await workingHoursModel.findById(id);

  if (!workingHour) {
    throw {
      status: 404,
      message: "Horário não encontrado"
    };
  }

  // Somente o dono ou admin
  if (workingHour.barber_id !== user.id && user.role !== "admin") {
    throw {
      status: 403,
      message: "Acesso negado"
      };
  }

  // impedir troca de dono
  if (data.barber_id) {
    delete data.barber_id;
  }

  // Evitar a duplicação no dia
  if (data.weekday) {
    const existing = await workingHoursModel.findByBarberAndDay(user.id,data.weekday);
    
    if (existing && existing.id !== id) {
      throw {
        status: 400,
        message: "Já existe horário para esse dia"
      };
    }
  }
  
  // Validação de Horário de Serviço
  if(data.start_time || data.end_time){
    workingHourTimeValidator( data.start_time || workingHour.start_time, data.end_time || workingHour.end_time);
  }
  
  return await workingHoursModel.update(id, data);
}

module.exports = updateWorkingHoursService;
