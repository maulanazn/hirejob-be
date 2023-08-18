const jwt = require('jsonwebtoken');
const secretKey = 'secretKey123';

const UserModel = require('../model/UserModel');
const { getUserByEmail } = require('../model/Auth');
const { hashPassword, comparePassword } = require('../midlleware/hashing');

//======================================= Import ==========================================================

//=========================================== Create User Controller ==================================

const CreateUserController = async (req, res) => {
  console.log('error');
  const { password, email } = req.body;
  console.log('error');
  console.log(req.body);
  // Panjang password
  if (password.length <= 8) {
    return res.status(409).json({
      status: ' fail',
      message: 'Password to Short',
      error: true,
    });
  }

  // Validasi Unik Karater
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[@.,!]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    return res.status(409).json({
      error: 'Non-unique password.',
      message: 'The password you entered is not unique. Please choose a password that has not been used before.',
      error: true,
    });
  }

  // Vertifikasi Email
  let emailVertifikasi = await getUserByEmail(email);
  console.log(emailVertifikasi);
  if (emailVertifikasi.rows[0]) {
    return res.status(409).json({
      status: ' fail',
      message: 'Email already exists.',
      error: true,
    });
  }

  // Hashing password
  let hash = await hashPassword(password);
  req.body.password = hash;

  try {
    // change data
    let data = {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
      position: req.body.position,
    };

    const result = await UserModel.CreateUserModel(data);
    console.log('rsult');
    console.log(result);
    res.status(201).json({
      status: 'succes',
      Message: 'Your Create Data Success',
      error: false,
      Data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

//============================================ Login Controller ====================================

const loginController = async (req, res) => {
  const { email, password } = req.body;
  // Validation Email
  let emailVertifikasi = await getUserByEmail(email);
  console.log(emailVertifikasi);
  if (!emailVertifikasi.rows[0]) {
    return res.status(409).json({
      error: 'Invalid email.',
      message: 'The email address you entered is not valid. Please enter a valid email address.',
      error: true,
    });
  }

  console.log(emailVertifikasi);

  const pwd = emailVertifikasi.rows[0].password; // get properti password
  // Vertifikasi password
  let VertifikasiLogin = await comparePassword({ passReq: password, passData: pwd });
  if (!VertifikasiLogin) {
    return res.status(401).json({
      status: 'failed',
      message: ' Your Password Authentication failed.',
      error: true,
      data: null,
    });
  }

  // Payload
  const token = emailVertifikasi.rows[0];
  console.log(token);
  const payload = {
    id: token.id,
    name: token.name,
    // email: token.email,
  };

  const token1 = jwt.sign(payload, secretKey, { expiresIn: '10000s' });

  try {
    res.status(201).json({
      status: 'Succes',
      message: ' Login Succes',
      error: false,
      data: token1,
    });
  } catch (error) {
    res.status(500).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

//========================================= Export Login ====================================
module.exports = {
  CreateUserController,
  loginController,
};
