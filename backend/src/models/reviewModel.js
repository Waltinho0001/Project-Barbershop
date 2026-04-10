const db = require('../database/db');

async function create(data) {
    if (!data.client_id || !data.barber_id || !data.rating) {
        throw new Error('Campos obrigatórios faltando');
    }

    const [result] = await db.query(
        `INSERT INTO reviews (client_id, barber_id, rating, comment)
         VALUES (?, ?, ?, ?)`,
        [data.client_id, data.barber_id, data.rating, data.comment || null]
    );

    return { id: result.insertId, ...data };
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM reviews');
    return rows;
}

async function update(id, data) {
    const fields = [];
    const values = [];

    for (let key in data) {
        fields.push(`${key} = ?`);
        values.push(data[key]);
    }

    values.push(id);

    await db.query(`UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...data };
}

async function remove(id) {
    await db.query('DELETE FROM reviews WHERE id = ?', [id]);
    return { message: 'Avaliação removida' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove
};