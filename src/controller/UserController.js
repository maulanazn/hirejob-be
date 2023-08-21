const jwt = require("jsonwebtoken");
const secretKey = "secretKey123";
require('dotenv').config();

const UserModel = require("../model/UserModel");
const { getUserByEmail, getUserById } = require("../model/Auth");
const { hashPassword, comparePassword } = require("../midlleware/hashing");
const sendToMail = require("./../midlleware/sendemail");

//======================================= Import ==========================================================

//=========================================== Get All user Controller ==================================
const GetAllUserController = async (req, res) => {
  const {sortBy, sort, offset, limit} = req.query;
    
  const pageSearched = offset || 1;
  const limitation = limit || 5;

  const data = {
      sortBy: sortBy || 'name',
      sort: sort || '',
      offset: (pageSearched - 1) * limitation,
      limit: limit || 10
  }

  try {
    const resultUsers = await UserModel.GetAllUserModel(data);

    return res.status(200).json({
      status: "succes",
      Message: "Success get all user",
      Data: resultUsers.rows
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      Message: "Failed get by id",
      Data: error.message
    });    
  }
}

//=========================================== SEarch All user Controller ==================================
const SearchAllUserController = async (req, res) => {
  const {search} = req.query;

  const data = {
    search: search || undefined
  }

  try {
    const resultUserSearch = await UserModel.SearchAllUserModel(data);
    
    return res.status(200).json({
      status: "succes",
      Message: "Success get all user",
      Data: resultUserSearch.rows
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      Message: "Failed get by id",
      Data: error.message
    });    
  }
}

//=========================================== Get User By Id Controller ==================================
const GetUserByIdController = async (req, res) => {
  const id = req.payload.id;

  try {
    const resultUserById = await getUserById(id);
    
    return res.status(200).json({
      status: "succes",
      Message: "Success get by id",
      Data: resultUserById.rows
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      Message: "Failed get by id",
      Data: error.message
    });    
  }
}

//=========================================== Create User Controller ==================================

const CreateUserController = async (req, res) => {
  console.log("error");
  const { password, email } = req.body;
  console.log("error");
  console.log(req.body);
  // Panjang password
  if (password.length <= 8) {
    return res.status(409).json({
      status: " fail",
      message: "Password to Short",
      error: true,
    });
  }

  // Validasi Unik Karater
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[@.,!]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    return res.status(409).json({
      error: "Non-unique password.",
      message:
        "The password you entered is not unique. Please choose a password that has not been used before.",
      error: true,
    });
  }

  // Vertifikasi Email
  let emailVertifikasi = await getUserByEmail(email);
  console.log(emailVertifikasi);
  if (emailVertifikasi.rows[0]) {
    return res.status(409).json({
      status: " fail",
      message: "Email already exists.",
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
    // sending email
    sendToMail(
      result.email,
      "Verify email",
      `<h1><a href="${process.env.EMAIL_URL}/user/verify/${result.id}">VERIFY EMAIL!!</a></h1>`
    );

    console.log("rsult");
    console.log(result);
    res.status(201).json({
      status: "succes",
      Message: "Your Create Data Success, please check your email",
      error: false,
      Data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "Error ",
      message: "Bad Server ",
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
      error: "Invalid email.",
      message:
        "The email address you entered is not valid. Please enter a valid email address.",
    });
  }

  // verifikasi verified is true or false
  if (!emailVertifikasi.rows[0].verified) {
    return res.status(401).json({
      status: "Failed",
      message: "You have to check your email first to verify your account",
    });
  }

  console.log(emailVertifikasi);

  const pwd = emailVertifikasi.rows[0].password; // get properti password
  // Vertifikasi password
  let VertifikasiLogin = await comparePassword({
    passReq: password,
    passData: pwd,
  });
  if (!VertifikasiLogin) {
    return res.status(401).json({
      status: "failed",
      message: " Your Password Authentication failed.",
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
      status: "Succes",
      message: " Login Succes",
      error: false,
      data: token1,
    });
  } catch (error) {
    res.status(500).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

//======================================== Activate User Controller =======================
const activateUserController = async (req, res) => {
  const { id } = req.params;

  const findById = await getUserById(id);
  if (!findById)
    return res.status(409).json({
      status: "Failed",
      message: "wrong id or email",
    });

  const verifyingUser = await UserModel.ActivateUserModel(id);
  if (!verifyingUser)
    return res.status(409).json({
      status: "Failed",
      message: "Email verifying is failed, contact the developer on email",
    });

  try {
    return res.status(200).json({
      status: "Success",
      message: "Email verifying is success",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

//========================================= Export Login ====================================
module.exports = {
  GetAllUserController,
  SearchAllUserController,
  GetUserByIdController,
  CreateUserController,
  loginController,
  activateUserController,
};
