const workingHoursModel = require("../../models/workScheduleModel.js");

async function listAllWorkHourService(user, barber_id){
  
  // Admin confere todos
  if(user.role === "admin"){
    return await workingHoursModel.findAll();
  }
  
  // O Barbeiro confere somente o dele
  if(user.role === "barber"){
    return await workingHoursModel.findByBarber(user.id);
  }
  
  // O Cliente confere de um barbeiro em especifico
  if(barber_id){
    return await workingHoursModel.findByBarber(barber_id);
  }
  
  throw{
    status: 400,
    message: "barber_id é obrigatório"
  };
}

module.exports = deleteWorkHourService;