const uuid = require("uuid").v4;
const { pool } = require("../config/pg");

const CreateProfileRecruiter = async (body) => {
  const id = uuid();
  try {
    const result = await pool.query(
      "INSERT INTO recruiter_profile (id, user_id, photo, company_name, company_field, province, city, company_info, email, company_email, company_phone, linkedin_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);",
      [
        id,
        body.user_id,
        body.photo,
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
      "UPDATE recruiter_profile SET photo=$1, company_name=$2, company_field=$3, province=$4, city=$5, company_info=$6, email=$7, company_email=$8, company_phone=$9, linkedin_url=$10 WHERE user_id=$11",
      [
        body.photo,
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
