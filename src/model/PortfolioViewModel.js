const { pool } = require("../config/pg");

const GetPortfolioViewModel = async (id) => {
    return new Promise((resolve, reject) =>
        pool.query("SELECT users.photo, users.name, users.province, users.city, users.description, work_experience.position, email, portfolio.photo AS portfolio_photo, portfolio.portfolio_name AS portfolio_name, work_experience.position AS work_position, work_experience.company_name, work_experience.working_start_at, work_experience.working_end_at FROM users JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id WHERE users.id = $1;", [id], (err, result) => {
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    }));
}

module.exports = {GetPortfolioViewModel};