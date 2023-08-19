const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');
const { query } = require('express');

//============================================= Create  Work Experience ==========================

const CreateExperienceModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO work_experience (user_name, position, company_name, working_start_at,working_end_at,description,user_id,id)
                             VALUES ($1, $2, $3, $4, $5, $6, $7,$8)
                             RETURNING user_name, position, company_name, working_start_at,working_end_at,description,user_id,created_at,id`,
      [body.user_name, body.position, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// =================================================== Update Work Experience ========================
const UpdateExpModel = async (body, id) => {
  try {
    const result = await pool.query(
      `UPDATE work_experience
                 SET user_name = $1, position = $2, company_name = $3, working_start_at = $4, working_end_at = $5, description = $6, user_id = $7
                 WHERE id = $8
                 RETURNING user_name, position, created_at, working_end_at, user_id`,
      [body.user_name, body.position, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const GetAllWorkEXP = async (user_id) => {
  const Query = 'SELECT * FROM work_experience WHERE user_id = $1';
  const Value = [user_id];

  return pool.query(Query, Value);
};

// ================================================== DELETE EXP ========================================

const DeleteExpModel = (id) => {
  const Query = ' DELETE FROM work_experience WHERE id = $1';
  const Value = [id];

  return pool.query(Query, Value);
};
module.exports = {
  CreateExperienceModel,
  UpdateExpModel,
  GetAllWorkEXP,
  DeleteExpModel,
};
