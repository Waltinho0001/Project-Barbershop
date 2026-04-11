const createUserService = require("../../services/user/createUserService.js");

async function createUserController(req, res){
  try{
    const { name, email, password, phone, role } = req.body;
    
    const user = await createUserService(req.body);
    
    return res.status(201).json({
    sucess: true,
    message: "usuário criado com sucesso!",
    data: user
    });
    
  }catch( error){
    return res.status(error.status || 500).json({
      sucess: false,
      message: error.message || "Falha interna do servidor",
      erros: error.erros || null
    });
  }
}

module.exports = createUserController;