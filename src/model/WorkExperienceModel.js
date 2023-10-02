const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

const countExperienceUser = async (user_id) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM work_experience WHERE user_id = $1", [user_id]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
}

const createExperienceModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO work_experience (user_name, position, work_experience_photo, company_name, working_start_at,working_end_at,description,user_id,id) VALUES ($1, $2, $3, $4, $5, $6, $7,$8, $9)`,
      [body.user_name, body.position, body.work_experience_photo, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateExpModel = async (body, id) => {
  try {
    const result = await pool.query(
      `UPDATE work_experience
                 SET user_name = $1, position = $2, work_experience_photo = $3, company_name = $4, working_start_at = $5, working_end_at = $6, description = $7, user_id = $8
                 WHERE id = $9`,
      [body.user_name, body.position, body.work_experience_photo, body.company_name, body.working_start_at, body.working_end_at, body.description, body.user_id, id]
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

const getWorkExpById = async (id) => {
  try {
    const query = 'SELECT * FROM work_experience WHERE id = $1';
    const value = [id];
  
    return pool.query(query, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteExpModel = (id) => {
  try {
    const query = ' DELETE FROM work_experience WHERE id = $1';
    const value = [id];
  
    return pool.query(query, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

const deletePortofolioModel = (id) => {
  try {
    const query = ' DELETE FROM portfolio WHERE id = $1';
    const value = [id];
  
    return pool.query(query, value);
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = {
  countExperienceUser,
  createExperienceModel,
  updateExpModel,
  getAllWorkEXP,
  getWorkExpById,
  deleteExpModel,
  deletePortofolioModel,
};
