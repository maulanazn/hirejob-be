const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

const userPortfolio = async (user_id) => {
  const id = uuidv4();

  try {
    const result = await pool.query("SELECT user_id, portfolio_name, repository_link, photo, app_type, created_at FROM portfolio WHERE user_id = $1", [user_id]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const showPortfolioById = async (id) => {
  const id = uuidv4();

  try {
    const result = await pool.query("SELECT id, user_id, portfolio_name, repository_link, photo, app_type, created_at FROM portfolio WHERE id = $1", [id]);

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createPortofolio = async (body) => {
  const id = uuidv4();

  try {
    const result = await pool.query("INSERT INTO portfolio (id, portfolio_name, repository_link, app_type, photo, user_id) VALUES ($1, $2, $3, $4, $5, $6)", [id, body.portfolio_name, body.repository_link, body.app_type, body.photo, body.user_id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updatePortofolio = async (body) => {
  try {
    const result = await pool.query("UPDATE portfolio SET portfolio_name = $1, repository_link = $2, app_type = $3, photo = $4 WHERE id = $5", [body.portfolio_name, body.repository_link, body.app_type, body.photo, body.user_id]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  userPortfolio,
  showPortfolioById,
  createPortofolio,
  updatePortofolio,
};
