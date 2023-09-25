const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

const createUserRecModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO user_recruiter (id, email, name, password, phone,position, company_name)
                   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, name, phone, position, company_name`,
      [id, body.email, body.name, body.password, body.phone, body.position, body.company_name]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUserRecModel = async (body, id) => {
  try {
    const result = await pool.query(`UPDATE user_recruiter SET photo = ?, company_name = ?, company_field = ?, province = ?, city = ?, company_info = ?, email = ?, company_email = ?, company_phone = ?, linkedin_url = ? WHERE id = ?`, [body.photo, body.company_name, body.company_field, body.province, body.city, body.company_info, body.email, body.company_email, body.company_phone, body.linkedin_url, id])

    return result;
  } catch(error) {
    throw new Error(error.message);
  }
}

const deleteUserRecModel = async (id) => {
  try {
    const result = await pool.query("DELETE FROM user_recruiter WHERE id = ?", [id]);

    return result;
  } catch(error) {
    throw new Error(error.message);
  }
}

const loginModel = async (body) => {
  try {
    const loginUserQuerySql = 'SELECT * FROM user_recruiter WHERE email = $1 AND password = $2';
    values = [email, password];
  
    return pool.query(loginUserQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

const activateUserRecModel = async (id) => {
  try {
    const activateUserRecQuerySql = 'UPDATE user_recruiter SET verified=true WHERE id=$1';
    values = [id];
  
    return pool.query(activateUserRecQuerySql, values);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUserRecModel,
  updateUserRecModel,
  deleteUserRecModel,
  loginModel,
  activateUserRecModel,
};
