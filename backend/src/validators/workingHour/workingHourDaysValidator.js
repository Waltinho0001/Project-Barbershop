function workingHoursValidator(data) {
  // Dias válidos
  const validDays = [
    'sunday','monday','tuesday','wednesday', 'thursday','friday','saturday'
  ];
  // Confere se o dia informado é válido
  if (!validDays.includes(data.weekday)) {
    return { error: { message: 'Dia da semana inválido' } };
  }

  if (!data.start_time || !data.end_time) {
    return { error: { message: 'Horários são obrigatórios' } };
  }

  return { error: null };
}

module.exports = workingHoursValidator;