const db = require('../database/db');

function validateTreatment(data) {
    if (!data.name || !data.price || !data.duration_minutes) {
        throw new Error('Campos obrigatórios: name, preço, duração em minutos');
    }
}

async function create(treatment) {
    try {
        validateTreatment(treatment);

        const { name, description, price, duration_minutes, is_active } = treatment;

        const [result] = await db.query(
            `INSERT INTO treatments (name, description, price, duration_minutes, is_active)
             VALUES (?, ?, ?, ?, ?)`,
            [name, description || null, price, duration_minutes, is_active ?? true]
        );

        return { id: result.insertId, ...treatment };
    } catch (error) {
        throw error;
    }
}

async function findById(id) {
    const [rows] = await db.query('SELECT * FROM treatments WHERE id = ?', [id]);
    return rows[0] || null;
}

async function findAll() {
    const [rows] = await db.query('SELECT * FROM treatments');
    return rows;
}

async function updateTreatments(id, treatment) {
    const fields = [];
    const values = [];

    for (let key in treatment) {
        fields.push(`${key} = ?`);
        values.push(treatment[key]);
    }

    values.push(id);

    await db.query(`UPDATE treatments SET ${fields.join(', ')} WHERE id = ?`, values);
    return { id, ...treatment };
}

async function deleteTreatments(id) {
    await db.query('DELETE FROM treatments WHERE id = ?', [id]);
    return { message: 'Serviço removido' };
}

module.exports = {
    create,
    findById,
    findAll,
    updateTreatments,
    deleteTreatments: remove
};