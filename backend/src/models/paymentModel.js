const db = require('../database/db');

async function create(data) {
    if (!data.appointment_id || !data.amount) {
        throw new Error('Campos obrigatórios: appointment_id, amount');
    }

    const [result] = await db.query(
        `INSERT INTO payments (appointment_id, amount, method, status, paid_at)
         VALUES (?, ?, ?, ?, ?)`,
        [
            data.appointment_id,
            data.amount,
            data.method || 'cash',
            data.status || 'pending',
            data.paid_at || null
        ]
    );

    return { id: result.insertId, ...data };
}

async function findByAppointment(appointment_id) {
    const [rows] = await db.query(
        `SELECT * FROM payments WHERE appointment_id = ?`,
        [appointment_id]
    );
    return rows;
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM payments WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM payments');
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

    await db.query(`UPDATE payments SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...data };
}

async function remove(id) {
    await db.query('DELETE FROM payments WHERE id = ?', [id]);
    return { message: 'Pagamento removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove,
    findByAppointment
};