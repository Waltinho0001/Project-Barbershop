const db = require('../database/db');

// Campos permitidos pra modificação
const allowedFields = ['name', 'email', 'phone', 'role'];

// CREATE
async function create(user) {
    const { name, email, phone, password, role } = user;

    if (!name || !email || !password) {
        throw new Error('Campos obrigatórios: name, email, password');
    }

    const [result] = await db.query(
        `INSERT INTO users (name, email, phone, password, role)
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, phone || null, password, role || 'client']
    );

    return {
        id: result.insertId,
        name,
        email,
        phone,
        role: role || 'client'
        // password NUNCA é retornado
    };
}

// FIND BY ID
async function findById(id) {
    const [rows] = await db.query(
        `SELECT id, name, email, phone, role, created_at 
         FROM users WHERE id = ?`,
        [id]
    );

    return rows[0] || null;
}

// FIND ALL USERS
async function findAll() {
    const [rows] = await db.query(
        `SELECT id, name, email, phone, role, created_at FROM users`
    );

    return rows;
}

// FIND BY EMAIL (LOGIN USE CASE)
async function findByEmail(email) {
    const [rows] = await db.query(
        `SELECT * FROM users WHERE email = ?`,
        [email]
    );

    return rows[0] || null;
}

// UPDATE
async function updateUser(id, userData) {
    const fields = [];
    const values = [];

    // Filtra apenas campos permitidos
    for (const key of allowedFields) {
      if (userData[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(userData[key]);
      }
    }

    // Se não houver campos válidos
    if (fields.length === 0) {
      throw new Error('Nenhum campo válido para atualização');
    }

    values.push(id);

    await db.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values
    );

    return await findById(id);
}

// DELETE
async function deleteUser(id) {
    const user = await findById(id);

    if (!user) {
        throw new Error('Usuário não encontrado');
    }

    await db.query(
        `DELETE FROM users WHERE id = ?`,
        [id]
    );

    return {
        message: 'Usuário deletado com sucesso',
        user
    };
}

module.exports = {
    create,
    findById,
    findAll,
    findByEmail,
    updateUser,
    deleteUser
};