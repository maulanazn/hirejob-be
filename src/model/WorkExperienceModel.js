const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');
const { query } = require('express');

//============================================= Create  Work Experience ==========================

const createExperienceModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO work_experience (user_name, position, company_name, working_start_at,working_end_at,description,user_id,id)
                             VALUES ($1, $2, $3, $4, $5, $6, $7,$8)`,
      [body.user_name, body.position, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

// =================================================== Update Work Experience ========================
const updateExpModel = async (body, id) => {
  try {
    const result = await pool.query(
      `UPDATE work_experience
                 SET user_name = $1, position = $2, company_name = $3, working_start_at = $4, working_end_at = $5, description = $6, user_id = $7
                 WHERE id = $8`,
      [body.user_name, body.position, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
    );

    return result;
  } catch (error) {
    throw new  Error(error.message);
  }
};

const getAllWorkEXP = async (user_id) => {
  try {
    const query = 'SELECT * FROM work_experience WHERE user_id = $1';
    const value = [user_id];
  
    return pool.query(query, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

// ================================================== DELETE EXP ========================================

const deleteExpModel = (id) => {
  try {
    const query = ' DELETE FROM work_experience WHERE id = $1';
    const value = [id];
  
    return pool.query(query, value);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  createExperienceModel,
  updateExpModel,
  getAllWorkEXP,
  deleteExpModel,
};
