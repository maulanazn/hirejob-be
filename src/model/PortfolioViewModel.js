const { pool } = require("../config/pg");

const GetPortfolioViewModel = async (id) => {
    return new Promise((resolve, reject) =>
        pool.query("SELECT candidate_profile.photo AS photo_profile, users.name AS user_name, candidate_profile.province AS user_province, candidate_profile.city AS user_city, candidate_profile.description AS user_description, work_experience.position AS work_position, users.email AS user_email, portfolio.photo AS portfolio_photo, portfolio.name AS portfolio_name, work_experience.position AS work_position, work_experience.company_name AS work_company_name, work_experience.working_start_at AS working_start, work_experience.working_end_at AS working_end FROM users JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id JOIN candidate_profile ON candidate_profile.user_id = users.id WHERE users.id = $1;", [id], (err, result) => {
        if (!err) {
            resolve(result);
        } else {
            reject(err);
        }
    }));
}

module.exports = {GetPortfolioViewModel};