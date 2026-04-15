function workingHourTimeValidator(start_time, end_time) {
  if (!start_time || !end_time) {
    return;
  }

  if (start_time >= end_time) {
    throw {
      status: 400,
      message: "Horário inicial deve ser menor que o final"
    };
  }
}

module.exports = workingHourTimeValidator;