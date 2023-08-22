const { query } = require('express');
const { pool } = require('../config/pg');

//========================================== Create Photo Profile ==================================

const CreatePhotoRecProfile = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO photo_recruiter (user_id,photo_profile,user_name)
                       VALUES ($1, $2, $3)`,
      [body.user_id, body.photo_profile, body.user_name]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

// ========================================= Update Photo Profil ========================================

const UpdatePhotoRecProfil = async (body, user_id) => {
  try {
    const result = await pool.query(
      `UPDATE photo_recruiter
                 SET photo_profile = $1
                 WHERE user_id = $2
                 RETURNING photo_profile`,
      [body.photo_profile, user_id]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//============================================= Vertifikasi Foto Profile ==================================

const VertifikasiPhotoRec = async (user_id) => {
  const Query = ' SELECT * FROM photo_recruiter WHERE user_id = $1';
  const Value = [user_id];

  return pool.query(Query, Value);
};

module.exports = {
  CreatePhotoRecProfile,
  UpdatePhotoRecProfil,
  VertifikasiPhotoRec,
};
