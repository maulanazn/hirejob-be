const { pool } = require('../config/pg');

//========================================= Create Skill User ====================================

const CreateSkill = async (payload, body) => {
  try {
    const result = await pool.query(
      `INSERT INTO skill (user_name,skill_name, user_id)
                         VALUES ($1, $2, $3)
                         RETURNING user_name,skill_name, user_id`,
      [payload.user_name, body.skill_name, payload.user_id]
    );

    return result.rows[0];
  } catch (error) {
    throw Error(error.message);
  }
};
//========================================= Update Skill User ============================

const UpdateSkill = async (body, user_id) => {
  try {
    const result = await pool.query(
      `UPDATE skill
               SET skill_name = $1
               WHERE user_id = $2
               RETURNING user_name, skill_name, user_id`,
      [body.skill_name, user_id]
    );

    return result.rows[0];
  } catch (error) {
    throw Error(error.message);
  }
};

//================================================ Get Skill User ================================
const ViewSkill = async (user_id) => {
  const Query = 'SELECT * FROM skill WHERE user_id = $1';
  const value = [user_id];

  return pool.query(Query, value);
};

//============================================ Export ============================================
module.exports = {
  CreateSkill,
  UpdateSkill,
  ViewSkill,
};
