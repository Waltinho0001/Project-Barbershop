const db = require('../database/db');

function validate(data) {
    if (!data.barber_id || !data.weekday || !data.start_time || !data.end_time) {
        throw new Error('Campos obrigatórios do horário de trabalho faltando');
    }
}

async function create(data) {
    validate(data);

    const [result] = await db.query(
        `INSERT INTO working_hours (barber_id, weekday, start_time, end_time)
         VALUES (?, ?, ?, ?)`,
        [data.barber_id, data.weekday, data.start_time, data.end_time]
    );

    return { id: result.insertId, ...data };
}

async function findByBarber(barber_id) {
    const [rows] = await db.query(
        `SELECT * FROM working_hours WHERE barber_id = ?`,
        [barber_id]
    );
    return rows;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM working_hours WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM working_hours');
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

    await db.query(`UPDATE working_hours SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...data };
}

async function remove(id) {
    await db.query('DELETE FROM working_hours WHERE id = ?', [id]);
    return { message: 'Horário removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove,
    findByBarber
};