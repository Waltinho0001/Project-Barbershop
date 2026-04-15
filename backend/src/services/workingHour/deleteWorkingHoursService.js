const workingHoursModel = require("../../models/workScheduleModel.js");

async function deleteWorkHourService(user, id ){
  
  // Busca serviço no database
  const workingHour = await workingHoursModel.findById(id);
  
  if (!workingHour){
    throw{
      status: 404,
      message: "Horário não encontrado!"
    };
  }
  
  // Apenas o dono e o Admin podem excluir
  if ( workingHour.barber_id !== id || workingHour.role !== "admin" ){
    throw{
      status: 403,
      message: "Acesso negado"
    };
  }
  
  return await workingHoursModel.remove(id);
}

module.exports = deleteWorkHourService;