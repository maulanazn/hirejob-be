const { pool } = require('../config/pg');

const createPortofolio = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO portfolio (portfolio_name, repository_link, app_type, photo,user_id)
                         VALUES ($1, $2, $3, $4, $5)`,
      [body.portfolio_name, body.repository_link, body.app_type, body.photo, body.user_id]
    );
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePortofolio = async (body, id) => {
  try {
    const result = await pool.query(
      `UPDATE portfolio
             SET portfolio_name = $1, repository_link = $2, app_type = $3, photo = $4
             WHERE id = $5`,
      [body.portfolio_name, body.repository_link, body.app_type, body.photo, id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const validatePortfolio = async (user_id) => {
  try {
    const result = 'SELECT * FROM portfolio WHERE user_id = $1';
    const value = [user_id];
  
    return pool.query(result, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPortofolio,
  updatePortofolio,
  validatePortfolio,
};
