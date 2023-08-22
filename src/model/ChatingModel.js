const { query } = require('express');
const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');

// ============================================ Create from Chating =============================================

const FromChattingModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO form_message (id, user_id, user_name, recruiter_id, recruiter_name)
                         VALUES ($1, $2, $3, $4, $5)`,
      [id, body.user_id, body.user_name, body.recruiter_id, body.recruiter_name]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//=========================================== Create from Chatting ===========================================

//=============================================== Create Chatting ========================================

const CreateChatting = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO messages (id, form_message_id , sender_id, user_name, message_detail)
                           VALUES ($1, $2, $3, $4, $5)`,
      [id, body.id_chat, body.id_pengirim, body.name, body.message_detail]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

// ================================================ Create Chatting NEXt =======================================

const CreateChattingnext = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO messages (id, form_message_id , sender_id, user_name, position, message_detail)
                           VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, body.id_chat, body.id_pengirim, body.name, body.position, body.message_detail]
    );

    return result;
  } catch (error) {
    throw Error(error.message);
  }
};

//============================================ From Chatting =============================================

const Shownamerect = async (user_id) => {
  const Query = 'SELECT * FROM fromchatting WHERE user_id= $1';
  const value = [user_id];

  return pool.query(Query, value);
};

const ShowNameCandidate = async (id_rect) => {
  const Query = 'SELECT * FROM fromchatting WHERE id_rect = $1';
  const value = [id_rect];

  return pool.query(Query, value);
};

//============================================== Show Chatting ===========================================

//========================================== Validasi =============================================

const ValidateUser = async (id) => {
  const Query = 'SELECT * FROM users WHERE id = $1 ';
  const value = [id];

  return pool.query(Query, value);
};

const Validatemessage = async (form_message_id) => {
  const Query = 'SELECT * FROM messages  WHERE form_message_id = $1 ';
  const value = [form_message_id];

  return pool.query(Query, value);
};

const ViewFromValidasi = async (user_id) => {
  try {
    const Query = 'SELECT user_name FROM form_message  WHERE user_id = $1 ';
    const value = [user_id];

    return pool.query(Query, value);
  } catch (error) {
    throw Error(error.message);
  }
};

const ViewFromValidasirect = async (recruiter_id) => {
  try {
    const Query = 'SELECT recruiter_name FROM form_message  WHERE recruiter_id = $1 ';
    const value = [recruiter_id];

    return pool.query(Query, value);
  } catch (error) {
    throw Error(error.message);
  }
};

module.exports = {
  FromChattingModel,
  CreateChatting,
  Shownamerect,
  ShowNameCandidate,
  CreateChattingnext,
  Validatemessage,
  ValidateUser,
  ViewFromValidasi,
  ViewFromValidasirect,
  //   ValidateRec,
};
