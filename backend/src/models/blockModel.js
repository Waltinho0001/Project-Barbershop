const db = require('../database/db');

async function create(data) {
    const [result] = await db.query(
        `INSERT INTO time_off (barber_id, date, start_time, end_time, reason)
         VALUES (?, ?, ?, ?, ?)`,
        [data.barber_id, data.date, data.start_time, data.end_time, data.reason]
    );

    return { id: result.insertId, ...data };
}

async function findByBarberAndDate(barber_id, date) {
    const [rows] = await db.query(
        `SELECT * FROM time_off WHERE barber_id = ? AND date = ?`,
        [barber_id, date]
    );
    return rows;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM time_off WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM time_off');
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

    await db.query(`UPDATE time_off SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...data };
}

async function remove(id) {
    await db.query('DELETE FROM time_off WHERE id = ?', [id]);
    return { message: 'Bloqueio removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove,
    findByBarberAndDate
};