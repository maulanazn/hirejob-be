const jwt = require("jsonwebtoken");
require('dotenv').config()

const UserRecModel = require("../model/UserRecModel");
const { getUserRecByEmail, getUserRecById } = require("../model/AuthModel");
const { hashPassword, comparePassword } = require("../midlleware/hashing");
const cloudinary = require('./../config/cloudinary');

const getUserRecByIdController = async (req, res) => {
  const id = req.payload.id;

  try {
    const resultUserRecById = await getUserRecById(id);

    return res.status(200).json({
      status: "succes",
      Message: "Success get by id",
      data: resultUserRecById.rows[0],
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

  if (password.length <= 8) {
    return res.status(409).json({
      status: " fail",
      message: "Password to Short",
    });
  }

  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialChar = /[@.,!]/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasSpecialChar) {
    return res.status(409).json({
      status: "Non-unique password.",
      message: "The password you entered is not unique. Password must include at least one capital word, one lower word, and one special character.",
    });
  }

  let emailVertifikasi = await getUserRecByEmail(email);
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

    const responseData = {
      id: userData.id,
      company_name: userData.company_name
    }

    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "30d" });
    return res.status(201).json({
      status: "Succes",
      message: " Login Succes",
      data: responseData,
      access_token: token
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad Request",
      message: error.message,
    });
  }
};

const updateRecProfile = async (req, res) => {
  const id = req.payload.id;
  let { company_name, company_field, province, city, company_info, company_email, company_phone, linkedin_url } = req.body;
  const resultById = await getUserRecById(id);

  if (!req.file) {
    try {
      let data = {
        company_name: company_name || resultById.rows[0].company_name,
        company_field: company_field || resultById.rows[0].company_field,
        province: province || resultById.rows[0].province,
        city: city || resultById.rows[0].city,
        company_info: company_info || resultById.rows[0].company_info,
        company_email: company_email || resultById.rows[0].company_email,
        company_phone: company_phone || resultById.rows[0].company_phone,
        linkedin_url: linkedin_url || resultById.rows[0].linkedin_url,
        photo: resultById.rows[0].photo
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
  } else {
    const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

    try {
      let data = {
        company_name: company_name || resultById.rows[0].company_name,
        company_field: company_field || resultById.rows[0].company_field,
        province: province || resultById.rows[0].province,
        city: city || resultById.rows[0].city,
        company_info: company_info || resultById.rows[0].company_info,
        company_email: company_email || resultById.rows[0].company_email,
        company_phone: company_phone || resultById.rows[0].company_phone,
        linkedin_url: linkedin_url || resultById.rows[0].linkedin_url,
        photo: photo.secure_url || resultById.rows[0].photo
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

}

module.exports = {
  getUserRecByIdController,
  createUserRecController,
  loginController,
  updateRecProfile,
};
