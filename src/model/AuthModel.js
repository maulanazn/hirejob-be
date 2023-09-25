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
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (err, result) => {
      if (!err) {
          resolve(result)
      } else {
        reject(err);
      }
    })
  );
};

const getUserRecByEmail = async (email) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM user_recruiter WHERE email ='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const getUserRecById = async (id) => {
  return new Promise((resolve, reject) =>
    pool.query(`SELECT * FROM user_recruiter WHERE id ='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

module.exports = {
  getUserByEmail,
  getUserById,
  getUserRecByEmail,
  getUserRecById,
};
