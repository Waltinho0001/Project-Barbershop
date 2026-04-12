function treatmentDataValidator(data) {
  const errors = [];

  // Nome
  if (!data.name || data.name.trim() === "") {
    errors.push("Nome do serviço é obrigatório");
  }

  // Preço
  if (data.price === undefined) {
    errors.push("Preço é obrigatório");
  } else if (isNaN(data.price) || Number(data.price) <= 0) {
    errors.push("Preço deve ser um número maior que 0");
  }

  // Duração
  if (!data.duration) {
    errors.push("Duração é obrigatória");
  } else if (!Number.isInteger(data.duration) || data.duration <= 0) {
    errors.push("Duração deve ser um número inteiro positivo");
  }

  return errors;
}

module.exports = treatmentDataValidator;