const db = require('../database/db');

// Validação básica
function validateUser(data) {
    if (!data.name || !data.email || !data.password) {
        throw new Error('Campos obrigatórios: name, email, password');
    }
}

// CREATE
async function create(user) {
    try {
        validateUser(user);

        const { name, email, phone, password, role } = user;

        const [result] = await db.query(
            `INSERT INTO users (name, email, phone, password, role)
             VALUES (?, ?, ?, ?, ?)`,
            [name, email, phone || null, password, role || 'client']
        );

        return { id: result.insertId, ...user };
    } catch (error) {
        throw error;
    }
}

// READ
async function findById(id) {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    }
}

async function findAll() {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        return rows;
    } catch (error) {
        throw error;
    }
}

async function findByEmail(email) {
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0] || null;
    } catch (error) {
        throw error;
    }
}

// UPDATE
async function update(id, user) {
    try {
        const fields = [];
        const values = [];

        for (let key in user) {
            fields.push(`${key} = ?`);
            values.push(user[key]);
        }

        values.push(id);

        await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE id = ?`,
            values
        );

        return { id, ...user };
    } catch (error) {
        throw error;
    }
}

// DELETE
async function remove(id) {
    try {
        await db.query('DELETE FROM users WHERE id = ?', [id]);
        return { message: 'Usuário deletado com sucesso' };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    create,
    findById,
    findAll,
    findByEmail,
    update,
    delete: remove
};