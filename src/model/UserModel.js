const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

const getAllUserModel = async (data) => {
  try {
    const result = await pool.query(`SELECT candidate_profile.photo AS candidate_photo, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id WHERE ${data.sortBy} ILIKE '%${data.sort}%' OFFSET ${data.offset} LIMIT ${data.limit}`);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const searchAllUserModel = async (data) => {
  try {
    const result = await pool.query(`SELECT candidate_profile.photo AS candidate_photo, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id WHERE name ILIKE '%${data.search}%' UNION SELECT candidate_profile.photo AS candidate_photo, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id WHERE last_work ILIKE '%${data.search}%' UNION SELECT candidate_profile.photo AS candidate_photo, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id WHERE province ILIKE '%${data.search}%' UNION SELECT candidate_profile.photo AS candidate_photo, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id WHERE city ILIKE '%${data.search}%'`);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const createUserModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(`INSERT INTO users (id, email, name, password, phone,position) VALUES ($1, $2, $3, $4, $5, $6)`, [id, body.email, body.name, body.password, body.phone, body.position]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserModel = async (body, id) => {
    try {
        const result = await pool.query(`UPDATE users SET name = $1, position = $2, domicile = $3, last_work = $4, description = $5, photo = $6, skill_name = $7 WHERE id = $8`, [body.name, body.position, body.domicile, body.last_work, body.description, body.photo, body.skill_name, id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteUserModel = async (id) => {
    try {
        const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const loginModel = async (body) => {
  try {
    const loginUserQuerySql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    values = [email, password];
  
    return pool.query(loginUserQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

const activateUserModel = async (id) => {
  try {
    const activateUserQuerySql = 'UPDATE users SET verified=true WHERE id=$1';
    values = [id];
  
    return pool.query(activateUserQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUserModel,
  searchAllUserModel,
  createUserModel,
  updateUserModel,
  deleteUserModel,
  loginModel,
  activateUserModel,
};
