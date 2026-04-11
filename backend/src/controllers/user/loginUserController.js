const loginUserService = require("../../services/user/loginUserService.js");

async function loginUserController(req, res) {
  try {
    const result = await loginUserService(req.body);

    return res.status(200).json({
      success: true,
      message: "Login realizado com sucesso!",
      data: result
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = loginUserController;