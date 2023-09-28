const { pool } = require("../config/pg");

const getUserView = async (id) => {
    try {
        const result = await pool.query(`SELECT photo AS user_photo, name, position, domicile, last_work, description, skill_name FROM users WHERE id = $1`, [id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getSocmedView = async (user_id) => {
    try {
        const result = await pool.query(`SELECT social_media_name, link FROM social_media WHERE user_id = $1`, [user_id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getPortfolioView = async (user_id) => {
    try {
        const result = await pool.query(`SELECT photo AS portfolio_photo, portfolio_name  FROM portfolio WHERE user_id = $1`, [user_id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getWorkExpView = async (user_id) => {
    try {
        const result = await pool.query(`SELECT work_experience_photo, position AS work_experience_position, company_name, working_start_at, working_end_at, description AS work_experience_description FROM work_experience WHERE user_id = $1`, [user_id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getUserView,
    getSocmedView,
    getPortfolioView,
    getWorkExpView,
};