const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userModel = require("../../models/userModel.js");
const loginUserValidator = require("../../validators/user/loginUserValidator.js");

const {JWT_SECRET} = require("../../config/config.js");

async function loginUserService(data){
  
  // Validaçào de dados
  const errors = loginUserValidator(data);
  
  if (errors.length > 0) {
    throw {
      status: 400,
      message: "Falha de validação",
      errors
    };
  }
  
  // Busca o usuário no Database
  const user = await userModel.findByEmail(data.email);
  
  if (!user) {
    throw {
      status: 401,
      message: "Email inválido"
    };
  }
  
  // Comapração de senhas
  const passwordMatch = await bcrptjs.compare(
    data.password, 
    user.password
  );
  
  if(!passwordMatch){
    throw {
      status: 401,
      message: "Senha inválida"
    };
  }
  
  // Geração de Token JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    JWT_SECRET, // JWT .env
    {
      expiresIn: "1d" // Expira em 1 dia
    }
  );
  
  // RETORNA OS DADOS
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    },
    token
  };
}

module.exports = loginUserService;