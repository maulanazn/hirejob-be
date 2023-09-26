const { query } = require('express');
const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');
const { getIO } = require('../config/WebSocket');

const fromChattingModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO form_message (id, user_id, user_name, recruiter_id, recruiter_name)
                         VALUES ($1, $2, $3, $4, $5)`,
      [id, body.user_id, body.user_name, body.recruiter_id, body.recruiter_name]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChatting = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO messages (id, form_message_id , sender_id, user_name, message_detail)
                           VALUES ($1, $2, $3, $4, $5)`,
      [id, body.id_chat, body.id_pengirim, body.name, body.message_detail]
    );

    const comment = result.rows[0];

    const io = getIO();

    if (io) {
      io.emit('new comment', comment);
    } else {
      console.error('Socket.IO is not properly initialized.');
    }

    return comment;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChattingnext = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO messages (id, form_message_id , sender_id, user_name, position, message_detail)
                           VALUES ($1, $2, $3, $4, $5, $6)`,
      [id, body.id_chat, body.id_pengirim, body.name, body.position, body.message_detail]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const showNameRec = async (user_id) => {
  const result = 'SELECT * FROM fromchatting WHERE user_id= $1';
  const value = [user_id];

  return pool.query(result, value);
};

const showNameCandidate = async (id_rect) => {
  const result = 'SELECT * FROM fromchatting WHERE id_rect = $1';
  const value = [id_rect];

  return pool.query(result, value);
};

const validateUser = async (id) => {
  const result = 'SELECT * FROM users WHERE id = $1 ';
  const value = [id];

  return pool.query(result, value);
};

const validateMessage = async (form_message_id) => {
  const result = 'SELECT * FROM messages  WHERE form_message_id = $1 ';
  const value = [form_message_id];

  return pool.query(result, value);
};

const viewFromValidation = async (user_id) => {
  try {
    const result = 'SELECT user_name FROM form_message  WHERE user_id = $1 ';
    const value = [user_id];

    return pool.query(result, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

const viewFromValidationRec = async (recruiter_id) => {
  try {
    const result = 'SELECT recruiter_name FROM form_message  WHERE recruiter_id = $1 ';
    const value = [recruiter_id];

    return pool.query(result, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  fromChattingModel,
  createChatting,
  showNameRec,
  showNameCandidate,
  createChattingnext,
  validateMessage,
  validateUser,
  viewFromValidation,
  viewFromValidationRec,
};
