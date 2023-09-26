const { pool } = require("../config/pg");

const getPortfolioViewModel = async (id) => {
    return new Promise((resolve, reject) =>
        pool.query("SELECT users.photo AS user_photo, users.name AS user_name, users.position AS user_position, users.domicile AS user_domicile, users.last_work AS user_lastwork, users.description AS user_description, users.skill_name AS user_skill, portfolio.photo AS portfolio_photo, portfolio.portfolio_name, work_experience.position AS work_position, work_experience.company_name, work_experience.working_start_at, work_experience.working_end_at, work_experience.description AS work_description FROM users JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id WHERE users.id = $1;", [id], (err, result) => {
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    }));
}

module.exports = {getPortfolioViewModel};