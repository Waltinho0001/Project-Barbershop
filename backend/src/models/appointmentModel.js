const db = require('../database/db');

function validateAppointment(data) {
    if (!data.client_id || !data.barber_id || !data.service_id || !data.appointment_date || !data.appointment_time) {
        throw new Error('Campos obrigatórios faltando no agendamento');
    }
}

// CREATE
async function create(appointment) {
    try {
        validateAppointment(appointment);

        const {
            client_id,
            barber_id,
            service_id,
            appointment_date,
            appointment_time,
            status,
            notes
        } = appointment;

        const [result] = await db.query(
            `INSERT INTO appointments 
            (client_id, barber_id, service_id, appointment_date, appointment_time, status, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                client_id,
                barber_id,
                service_id,
                appointment_date,
                appointment_time,
                status || 'pending',
                notes || null
            ]
        );

        return { id: result.insertId, ...appointment };
    } catch (error) {
        throw error;
    }
}

// CHECK CONFLICT (REGRA CRÍTICA)
async function checkConflict(barber_id, date, time) {
    const [rows] = await db.query(
        `SELECT * FROM appointments
         WHERE barber_id = ? AND appointment_date = ? AND appointment_time = ?`,
        [barber_id, date, time]
    );

    return rows.length > 0;
}

// MÉTODOS EXTRAS
async function findByBarberAndDate(barber_id, date) {
    const [rows] = await db.query(
        `SELECT * FROM appointments WHERE barber_id = ? AND appointment_date = ?`,
        [barber_id, date]
    );
    return rows;
}

async function findByClient(client_id) {
    const [rows] = await db.query(
        `SELECT * FROM appointments WHERE client_id = ?`,
        [client_id]
    );
    return rows;
}

// CRUD restante
async function findById(id) {
    const [rows] = await db.query('SELECT * FROM appointments WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM appointments');
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

    await db.query(`UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...data };
}

async function remove(id) {
    await db.query('DELETE FROM appointments WHERE id = ?', [id]);
    return { message: 'Agendamento removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    update,
    delete: remove,
    checkConflict,
    findByBarberAndDate,
    findByClient
};