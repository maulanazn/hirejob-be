const { query } = require('express');
const { pool } = require('../config/pg');

//========================================== Create Photo Profile ==================================

const CreatePhotoProfile = async (body) => {
  try {
    const result = await pool.query(
      `INSERT INTO photo (user_id,photo_profile,user_name)
                       VALUES ($1, $2, $3)
                       RETURNING user_id,photo_profile,user_name`,
      [body.user_id, body.photo_profile, body.user_name]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

// ========================================= Update Photo Profil ========================================

const UpdatePhotoProfil = async (body, user_id) => {
  try {
    const result = await pool.query(
      `UPDATE photo
                 SET photo_profile = $1
                 WHERE user_id = $2
                 RETURNING photo_profile`,
      [body.photo_profile, user_id]
    );

    return result.rows[0];
  } catch (error) {
    console.log(error);
    // res.status(500).json({
    //   status: 'Error ',
    //   message: 'Bad Server ',
    //   message: error.message,
    // });
  }
};

//============================================= Vertifikasi Foto Profile ==================================

const VertifikasiPhoto = async (user_id) => {
  const Query = ' SELECT * FROM photo WHERE user_id = $1';
  const Value = [user_id];

  return pool.query(Query, Value);
};

module.exports = {
  CreatePhotoProfile,
  UpdatePhotoProfil,
  VertifikasiPhoto,
};
