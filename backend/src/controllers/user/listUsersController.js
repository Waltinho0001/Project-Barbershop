const listUsersService = require("../../services/user/listUsersService.js");

async function listUsersController(req, res) {
  try {

    const users = await listUsersService();

    return res.status(200).json({
      success: true,
      message: "Usuários listados com sucesso!",
      data: users
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = listUsersController;