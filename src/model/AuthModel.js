const { pool } = require('../config/pg');

const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users WHERE email ='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getUserById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserRecByEmail = async (email) => {
  try {
    const result = await pool.query(`SELECT * FROM user_recruiter WHERE email = $1`, [email]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserRecById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM user_recruiter WHERE id = $1`, [id]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getUserByEmail,
  getUserById,
  getUserRecByEmail,
  getUserRecById,
};
