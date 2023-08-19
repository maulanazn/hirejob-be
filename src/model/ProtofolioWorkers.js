const { pool } = require('../config/pg');

//===================================== Create DATA ===========================================

const CreatePortofolio = async (body) => {
  try {
    console.log('QUERY DB');
    const result = await pool.query(
      `INSERT INTO portfolio (user_name, repository_link, app_type, photo,user_id)
                         VALUES ($1, $2, $3, $4, $5)
                         RETURNING user_name, repository_link, app_type, photo, created_at, user_id`,
      [body.user_name, body.repository_link, body.app_type, body.photo, body.user_id]
    );
    console.log('eror terusan === db');
    console.log(result);
    return result.rows[0];
  } catch (error) {
    console.log('eror terusan db');
    console.log(error);
    // res.status(500).json({
    //   status: 'Error ',
    //   message: 'Bad Server ',
    //   message: error.message,
    // });
  }
};

//============================================ Update Data =======================================

const UpdatePortofolio = async (body, id) => {
  try {
    const result = await pool.query(
      `UPDATE portfolio
             SET user_name = $1, repository_link = $2, app_type = $3, photo = $4
             WHERE id = $5
             RETURNING user_name, repository_link, app_type, photo,created_at, user_id`,
      [body.user_name, body.repository_link, body.app_type, body.photo, id]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   status: 'Error ',
    //   message: 'Bad Server ',
    //   message: error.message,
    // });
  }
};

//=============================================== Validasi Data ======================================

const Validasi = async (user_id) => {
  const Query = 'SELECT * FROM portfolio WHERE user_id = $1';
  const value = [user_id];

  return pool.query(Query, value);
};

module.exports = {
  CreatePortofolio,
  UpdatePortofolio,
  Validasi,
};
