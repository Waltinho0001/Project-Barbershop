function loginUserValidator(data) {
  const errors = [];

  if (!data.email) {
    errors.push("Email é obrigatório");
  }

  if (!data.password) {
    errors.push("Senha é obrigatória");
  }

  return errors;
}

module.exports = loginUserValidator;