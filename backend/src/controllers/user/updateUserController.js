const updateUserService = require("../../services/user/updateUserService.js");

async function updateUserController(req, res) {
  try {

    const { id } = req.params;

    const user = await updateUserService(id, req.body);

    return res.status(200).json({
      success: true,
      message: "Usuário atualizado com sucesso!",
      data: user
    });

  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Falha interna do servidor",
      errors: error.errors || null
    });
  }
}

module.exports = updateUserController;