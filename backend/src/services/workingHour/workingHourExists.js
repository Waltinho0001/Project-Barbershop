async function workingHourExists(){
  // Busca serviços no dia 
  const workingHourExist = await await findByBarberAndDay( barber_ID, data_weekday);
  
  // Confere se existe serviço igual naquele mesmo dia
  if(workingHourExists){
    throw{
      status: 400,
      message: "Você já definiu horário para este dia"
    };
  }
  
  return workingHourExist;
}

module.exports = workingHourExists;