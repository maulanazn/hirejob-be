const jwt = require("jsonwebtoken");
require('dotenv').config()

const UserRecModel = require("../model/UserRecModel");
const { getUserRecByEmail, getUserRecById } = require("../model/AuthModel");
const { hashPassword, comparePassword } = require("../midlleware/hashing");

const getUserRecByIdController = async (req, res) => {
  const id = req.payload.id;

  try {
    const resultUserRecById = await getUserRecById(id);
    
    return res.status(200).json({
      status: "succes",
      Message: "Success get by id",
      data: resultUserRecById.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad request",
      data: error.message
    });    
  }
}

const createUserRecController = async (req, res) => {
  const { email, name, password, phone, position, company_name } = req.body;
  // Panjang password
  if (password.length <= 8) {
    return res.status(409).json({
      status: " fail",
      message: "Password to Short",
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
    });
  }

  // Vertifikasi Email
  let emailVertifikasi = await getUserRecByEmail(email);
  if (emailVertifikasi.rows[0]) {
    return res.status(409).json({
      status: " fail",
      message: "Email already exists.",
    });
  }

  // Hashing password
  let hash = await hashPassword(password);

  try {
    // change data
    let data = {
      email: email,
      name: name,
      password: hash,
      position: position,
      phone: phone,
      position: position,
      company_name: company_name
    };

    let result = await UserRecModel.createUserRecModel(data);

    return res.status(201).json({
      status: "succes",
      Message: "Your Create Data Success, check your email",
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad request ",
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  let emailVertifikasi = await getUserRecByEmail(email);
  if (!emailVertifikasi.rows[0]) {
    return res.status(409).json({
      error: "Invalid email.",
      message:
        "The email address you entered is not valid. Please enter a valid email address.",
    });
  }

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
      data: null,
    });
  }

  try {
    const userData = emailVertifikasi.rows[0];
    const payload = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "30d" });
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

const updateRecProfile = async (req, res) => {
  let { company_name, company_field, province, city, company_info, email, company_email, company_phone, linkedin_url, photo } = req.body;
  const id = req.payload.id;

  try {
    let data = {
      company_name: company_name,
      company_field: company_field,
      province: province,
      city: city,
      company_info: company_info,
      email: email,
      company_email: company_email,
      company_phone: company_phone,
      linkedin_url: linkedin_url,
      photo: photo
    };

    const result = await UserRecModel.updateUserRecModel(data, id)
  
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

module.exports = {
  getUserRecByIdController,
  createUserRecController,
  loginController,
  updateRecProfile,
};
