const db = require('../database/db');

function validateService(data) {
    if (!data.name || !data.price || !data.duration_minutes) {
        throw new Error('Campos obrigatórios: name, price, duration_minutes');
    }
}

async function create(service) {
    try {
        validateService(service);

        const { name, description, price, duration_minutes, is_active } = service;

        const [result] = await db.query(
            `INSERT INTO services (name, description, price, duration_minutes, is_active)
             VALUES (?, ?, ?, ?, ?)`,
            [name, description || null, price, duration_minutes, is_active ?? true]
        );

        return { id: result.insertId, ...service };
    } catch (error) {
        throw error;
    }
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM services WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM services');
    return rows;
}

async function update(id, service) {
    const fields = [];
    const values = [];

    for (let key in service) {
        fields.push(`${key} = ?`);
        values.push(service[key]);
    }

    values.push(id);

    await db.query(`UPDATE services SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...service };
}

async function remove(id) {
    await db.query('DELETE FROM services WHERE id = ?', [id]);
    return { message: 'Serviço removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove
};