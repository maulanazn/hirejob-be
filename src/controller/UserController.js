const jwt = require("jsonwebtoken");
require('dotenv').config();

const UserModel = require("../model/UserModel");
const { getUserByEmail, getUserById } = require("../model/AuthModel");
const { hashPassword, comparePassword } = require("../midlleware/hashing");
const sendToMail = require("./../midlleware/sendemail");

const getAllUserController = async (req, res) => {
  const {search, sortBy, sort, offset, limit} = req.query;
    
  const pageSearched = offset || 1;
  const limitation = limit || 5;

  const data = {
      sortBy: sortBy || 'name',
      sort: sort || '',
      offset: (pageSearched - 1) * limitation,
      limit: limit || 10
  }
  
  if (search != undefined) {
    const resultUserSearch = await UserModel.searchAllUserModel(data);
    
    return res.status(200).json({
      status: "succes",
      Message: "Success get all user",
      data: resultUserSearch.rows
    });
  }

  try {
    const resultUsers = await UserModel.getAllUserModel(data);

    return res.status(200).json({
      status: "succes",
      Message: "Success get all user",
      data: resultUsers.rows
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad request",
      data: error.message
    });    
  }
}

const getUserByIdController = async (req, res) => {
  const id = req.payload.id;

  try {
    const resultUserById = await getUserById(id);
    
    return res.status(200).json({
      status: "succes",
      Message: "Success get by id",
      data: resultUserById.rows[0]
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad request",
      data: error.message
    });    
  }
}

const createUserController = async (req, res) => {
  let { email, name, password, phone, position, last_work, description, photo, skill_name, domicile } = req.body;

  let emailVertifikasi = await getUserByEmail(email);
  if (emailVertifikasi.rows[0]) {
    return res.status(409).json({
      status: " fail",
      message: "Email already exists.",
    });
  }

  let hash = await hashPassword(password);

  try {
    let data = {
      email: email,
      name: name,
      password: hash,
      phone: phone,
      position: position,
      last_work: last_work,
      description: description,
      photo: photo,
      skill_name: skill_name,
      domicile: domicile
    };

    let result = await UserModel.createUserModel(data);
    // sending email
    sendToMail(
      result.email,
      "Verify email",
      `<h1><a href="https://lazy-teal-piranha-vest.cyclic.cloud/user/verify/${result.id}">VERIFY EMAIL!!</a></h1>`
    );

    return res.status(201).json({
      status: "succes",
      Message: "Your Create Data Success, please check your email",
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  // Validation Email
  let emailVertifikasi = await getUserByEmail(email);
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

  const pwd = emailVertifikasi.rows[0].password; // get properti password
  
  let VertifikasiLogin = await comparePassword({
    passReq: password,
    passData: pwd,
  });
  if (!VertifikasiLogin) {
    return res.status(401).json({
      status: "failed",
      message: " Your Password Authentication failed.",
    });
  }

  try {
    const userData = emailVertifikasi.rows[0];
  
    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };
  
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '30d' });

    return res.status(201).json({
      status: "Succes",
      message: " Login Succes",
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  let { name, position, domicile, last_work, description, photo, skill_name } = req.body;
  const id = req.payload.id;

  
  try {
    let data = {
      name: name,
      position: position,
      domicile: domicile,
      last_work: last_work,
      description: description,
      photo: photo,
      skill_name: skill_name,
    };

    const result = await UserModel.updateUserModel(data, id)
  
    return res.status(201).json({
      status: "succes",
      Message: "Your Update Data Success",
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      message: error.message
    })
  }
}

const activateUserController = async (req, res) => {
  const { id } = req.params;

  const findById = await getUserById(id);
  if (!findById)
    return res.status(409).json({
      status: "Failed",
      message: "wrong id or email",
    });

  const verifyingUser = await UserModel.activateUserModel(id);
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
    return res.status(400).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

module.exports = {
  getAllUserController,
  getUserByIdController,
  createUserController,
  loginController,
  updateProfile,
  activateUserController,
};
