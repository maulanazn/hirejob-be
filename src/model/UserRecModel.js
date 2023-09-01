const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

// ================================================================== Create New User Kandidat ============================

const CreateUserRecModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO user_recruiter (id, email, name, password, phone,position, company_name)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, body.email, body.name, body.password, body.phone, body.position, body.company_name]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//================================================================== Login ================================================
const LoginModel = async (body) => {
  const LoginUserQuerySql = 'SELECT * FROM user_recruiter WHERE email = $1 AND password = $2';
  values = [email, password];

  return pool.query(LoginUserQuerySql, values);
};

//================================================================== Verified User ================================================
const ActivateUserRecModel = async (id) => {
  const ActivateUserRecQuerySql = 'UPDATE user_recruiter SET verified=true WHERE id=$1';
  values = [id];

  return pool.query(ActivateUserRecQuerySql, values);
};

//================================================= Export ========================================================

module.exports = {
  CreateUserRecModel,
  LoginModel,
  ActivateUserRecModel,
};
