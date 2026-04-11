const express = require("express");
const server = express();
const main = require("./cli.js");

const {PORT} = require("./config/config.js");
const { connectDB } = require("./database/db");

console.clear();

connectDB(); // CONEXÃO COM BANCO DE DADOS

server.listen( PORT , () => {
  console.log(`Servidor rodando na porta ${PORT}....`);
});

console.log("\n\n\n");

main();