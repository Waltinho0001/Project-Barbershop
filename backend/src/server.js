const express = require("express");
const server = express();

const {PORT} = require("./config/config.js");
const { connectDB } = require("./database/db");

connectDB(); // CONEXÃO COM BANCO DE DADOS

server.listen( PORT , () => {
  console.log(`Servidor rodando na porta ${PORT}....`);
});
