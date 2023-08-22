const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

//=================================================================== Modul Import ========================================

// ================================================================== Get All User Kandidat ============================
const GetAllUserModel = async (data) => {
  try {
    const result = await pool.query(`SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id WHERE ${data.sortBy} ILIKE '%${data.sort}%' OFFSET ${data.offset} LIMIT ${data.limit}`);

    return result;
  } catch (error) {
    throw Error(error.message);
  }
}

// ================================================================== Search All User Kandidat ============================
const SearchAllUserModel = async (data) => {
  try {
    const result = await pool.query(`SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id WHERE name ILIKE '%${data.search}%' UNION SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id WHERE last_work ILIKE '%${data.search}%' UNION SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id WHERE province ILIKE '%${data.search}%' UNION SELECT photo_profile, name, last_work, province, city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id WHERE city ILIKE '%${data.search}%'`);

    return result;
  } catch (error) {
    throw Error(error.message);
  }
}

// ================================================================== Create New User Kandidat ============================

const CreateUserModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO users (id, email, name, password, phone,position)
                   VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, body.email, body.name, body.password, body.phone, body.position]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//================================================================== Login ================================================
const LoginModel = async (body) => {
  const LoginUserQuerySql = 'SELECT * FROM users WHERE email = $1 AND password = $2';
  values = [email, password];

  return pool.query(LoginUserQuerySql, values);
};

//================================================================== Verified User ================================================
const ActivateUserModel = async (id) => {
  const ActivateUserQuerySql = 'UPDATE users SET verified=true WHERE id=$1';
  values = [id];

  return pool.query(ActivateUserQuerySql, values);
};

//================================================= Export ========================================================

module.exports = {
  GetAllUserModel,
  SearchAllUserModel,
  CreateUserModel,
  LoginModel,
  ActivateUserModel,
};
