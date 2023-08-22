const uuid = require("uuid").v4;
const { pool } = require("./../config/pg");

const CreateProfileRecruiter = async (body) => {
  const id = uuid();
  try {
    const result = await pool.query(
      "INSERT INTO recruiter_profile (id, user_id, company_name, company_field, province, city, company_info, email, company_email, company_phone, linkedin_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING company_name, company_field, province, city, company_info, email, company_email, company_phone, linkedin_url",
      [
        id,
        body.user_id,
        body.company_name,
        body.company_field,
        body.province,
        body.city,
        body.company_info,
        body.email,
        body.company_email,
        body.company_phone,
        body.linkedin_url
      ]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const UpdateProfileRecruiter = async (body, user_id) => {
  try {
    const result = await pool.query(
      "UPDATE recruiter_profile SET company_name=$1, company_field=$2, province=$3, city=$4, company_info=$5, email=$6, company_email=$7, company_phone=$8, linkedin_url=$9 WHERE user_id=$10 RETURNING company_name, company_field, province, city, company_info, email, company_email, company_phone, linkedin_url",
      [
        body.company_name,
        body.company_field,
        body.province,
        body.city,
        body.company_info,
        body.email,
        body.company_email,
        body.company_phone,
        body.linkedin_url,
        user_id
      ]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

const GetProfileRecruiter = async (user_id) => {
  const query = "SELECT * FROM recruiter_profile WHERE user_id=$1";
  const value = [user_id];

  return pool.query(query, value);
};

module.exports = {
  CreateProfileRecruiter,
  UpdateProfileRecruiter,
  GetProfileRecruiter,
};
