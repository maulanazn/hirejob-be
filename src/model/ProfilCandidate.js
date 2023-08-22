const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

//====================================================== Edit Profil =========================================

const CreateProfilcontroller = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO candidate_profile (user_name, province, city, last_work, description, user_id, id)
                     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [body.user_name, body.province, body.city, body.last_work, body.description, body.user_id, id]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//======================================================== UPDATE =====================================

const UpdateProfilcontroller = async (body, user_id) => {
  try {
    const result = await pool.query(
      `UPDATE candidate_profile
         SET user_name = $1, province = $2, city = $3, last_work = $4,description = $5
         WHERE user_id = $6`,
      [body.user_name, body.province, body.city, body.last_work, body.description, user_id]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

// ======================================================= GET Profil ========================

const GetBiodata = async (user_id) => {
  const query = ' SELECT * FROM candidate_profile WHERE user_id = $1';
  const Value = [user_id];

  return pool.query(query, Value);
};

//====================================== Export ==========================

module.exports = {
  CreateProfilcontroller,
  UpdateProfilcontroller,
  GetBiodata,
};
