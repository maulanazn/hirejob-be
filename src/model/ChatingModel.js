const { query } = require('express');
const { pool } = require('../config/pg');
const { v4: uuidv4 } = require('uuid');
const { getIO } = require('../config/WebSocket');

const fromChattingModel = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO form_message (id, user_id, user_name, recruiter_id, recruiter_name)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, user_name, recruiter_id, recruiter_name`,
      [id, body.user_id, body.user_name, body.recruiter_id, body.recruiter_name]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChatting = async (body) => {
  const id = uuidv4();
  try {
    const result = await pool.query(
      `INSERT INTO messages (id, form_message_id , sender_id, user_name, message_detail)
                           VALUES ($1, $2, $3, $4, $5) RETURNING id, form_message_id , sender_id, user_name, position, message_detail`,
      [id, body.form_message_id, body.sender_id, body.user_name, body.message_detail]
    );

    // const comment = result.rows[0];

    // const io = getIO();

    // if (io) {
    //   io.emit('new comment', comment);
    // } else {
    //   console.error('Socket.IO is not properly initialized.');
    // }

    return result;
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
      [id, body.form_message_id, body.sender_id, body.user_name, body.position, body.message_detail]
    );

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const showNameRec = async (user_id) => {
  const result = 'SELECT recruiter_name, recruiter_id FROM form_message WHERE user_id= $1';
  const value = [user_id];

  return pool.query(result, value);
};

const showNameCandidate = async (recruiter_id) => {
  const result = 'SELECT user_id, user_name FROM form_message WHERE recruiter_id = $1';
  const value = [recruiter_id];

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

const viewFromValidation = async (id) => {
  try {
    const result = 'SELECT name FROM users  WHERE id = $1 ';
    const value = [id];

    return pool.query(result, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

const viewFromValidationRec = async (id) => {
  try {
    const result = 'SELECT name FROM user_recruiter  WHERE id = $1 ';
    const value = [id];

    return pool.query(result, value);
  } catch (error) {
    throw new Error(error.message);
  }
};

const getRecruiterInfoByUserId = async (userId) => {
  try {
    const query = `
      SELECT
          ur.name AS recruiter_name,
          ur.photo AS recruiter_photo,
          m.position AS message_position,
          m.id AS message_id
      FROM
          form_message fm
      INNER JOIN
          user_recruiter ur ON fm.recruiter_id = ur.id
      INNER JOIN
          messages m ON fm.id = m.form_message_id
      WHERE
          fm.user_id = $1;
    `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error(`Error getting recruiter info and message position by user_id: ${error.message}`);
  }
};

const getUserInfoAndFormMessageId = async (userId) => {
  try {
    const query = `
      SELECT
          u.name AS user_name,
          u.photo AS user_photo,
          m.position AS message_position,
          m.id AS message_id
      FROM
          form_message fm
      INNER JOIN
          users u ON fm.user_id = u.id
      INNER JOIN
          messages m ON fm.id = m.form_message_id
      WHERE
          fm.recruiter_id = $1;
    `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    throw new Error(`Error getting user info and message by user_id: ${error.message}`);
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
  getRecruiterInfoByUserId,
  getUserInfoAndFormMessageId,
};
