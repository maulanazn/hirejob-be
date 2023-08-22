const { pool } = require("../config/pg");

const GetPortfolioViewModel = async (id) => {
    const query = "SELECT photo.photo_profile, users.name, candidate_profile.province, candidate_profile.city, candidate_profile.description, work_experience.position, users.email, portfolio.photo AS portfolio_photo, portfolio.name AS portfolio_name, work_experience.position AS work_position, work_experience.company_name, work_experience.working_start_at, work_experience.working_end_at FROM users JOIN photo ON photo.user_id = users.id JOIN portfolio ON portfolio.user_id = users.id JOIN work_experience ON work_experience.user_id = users.id JOIN candidate_profile ON candidate_profile.user_id = users.id WHERE users.id = $1;";
    const value = [id];

    return pool.query(query, value);
}

module.exports = {GetPortfolioViewModel};