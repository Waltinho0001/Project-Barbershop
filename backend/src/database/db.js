const mariadb = require("mariadb");
const config = require("../config/config");

// POOL
const pool = mariadb.createPool({
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  connectionLimit: 10,
  
  connectTimeout: 15000,
  acquireTimeout: 15000,
  timeout: 15000,
  
  ssl: {
    rejectUnauthorized: false
  },
  allowPublicKeyRetrieval: true
});

// TESTE DE CONEXÃO
async function connectDB() {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("Banco de dados conectado com sucesso!");
  } catch (error) {
    console.log("Houve falha ao conectar no banco: ");
    console.error(error);
    process.exit(1); // Finaliza a conexão
  } finally {
    if (connection) connection.release();
  }
}

// QUERY
async function query(sql, params = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    
    const result = await connection.query(sql, params);

    // Remoção de metadados do MariaDB (__proto__)
    return result;
  } catch (error) {
    console.log("Erro na query: ");
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

async function transaction(callback) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const result = await callback(connection);

    await connection.commit();
    return result;
  } catch (error) {
    if (connection) await connection.rollback();
    console.error("Erro na transação.");
    console.error(error);
    throw error;
  } finally {
    if (connection) connection.release();
  }
}

module.exports = {
  pool,
  query,
  transaction,
  connectDB
};