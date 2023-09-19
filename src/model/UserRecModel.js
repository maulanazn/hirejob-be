const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

// ================================================================== Create New User Kandidat ============================

const createUserRecModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO user_recruiter (id, email, name, password, phone,position, company_name)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, body.email, body.name, body.password, body.phone, body.position, body.company_name]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserRecModel = async (body) => {
  // TODO: Business logic here
}

const deleteUserRecModel = async (body) => {
  // TODO: Business logic here
}

//================================================================== Login ================================================
const loginModel = async (body) => {
  try {
    const loginUserQuerySql = 'SELECT * FROM user_recruiter WHERE email = $1 AND password = $2';
    values = [email, password];
  
    return pool.query(loginUserQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

//================================================================== Verified User ================================================
const activateUserRecModel = async (id) => {
  try {
    const activateUserRecQuerySql = 'UPDATE user_recruiter SET verified=true WHERE id=$1';
    values = [id];
  
    return pool.query(activateUserRecQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

//================================================= Export ========================================================

module.exports = {
  createUserRecModel,
  loginModel,
  activateUserRecModel,
};
