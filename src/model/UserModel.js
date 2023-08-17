const { pool } = require('../config/pg');

//=================================================================== Modul Import ========================================

// ================================================================== Create New User Kandidat ============================

const CreateUserModel = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO candidateUser (email, password, nama, phone,jabatan)
                   VALUES ($1, $2, $3, $4,$5)
                   RETURNING id,email, password, nama, phone,jabatan`,
      [body.email, body.password, body.nama, body.phone, body.jabatan]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

//================================================================== Login ================================================
const LoginModel = async (body) => {
  const LoginUserQuerySql = 'SELECT * FROM candidateUser WHERE email = $1 AND password = $2';
  values = [email, password];

  return pool.query(LoginUserQuerySql, values);
};

//================================================= Export ========================================================

module.exports = {
  CreateUserModel,
};
