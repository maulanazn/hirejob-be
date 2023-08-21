const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

//=================================================================== Modul Import ========================================

// ================================================================== Get All User Kandidat ============================
const GetAllUserModel = async () => {
  try {
    const result = await pool.query('SELECT photo.photo_profile, users.name, candidate_profile.last_work, candidate_profile.province, candidate_profile.city FROM users JOIN candidate_profile ON users.id = users.id JOIN photo ON photo.user_id = users.id');

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
                   VALUES ($1, $2, $3, $4, $5, $6)
                   RETURNING id,email,name ,password, phone,position`,
      [id, body.email, body.name, body.password, body.phone, body.position]
    );

    return result.rows[0];
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
  CreateUserModel,
  LoginModel,
  ActivateUserModel,
};
