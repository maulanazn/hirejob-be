const jwt = require("jsonwebtoken");

const UserRecModel = require("../model/UserRecModel");
const { getUserRecByEmail, getUserRecById } = require("../model/AuthModel");
const { hashPassword, comparePassword } = require("../midlleware/hashing");
const sendToMail = require("./../midlleware/sendemail");

//=========================================== Get User By Id Controller ==================================
const GetUserRecByIdController = async (req, res) => {
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

//=========================================== Create User Rec Controller ==================================

const CreateUserRecController = async (req, res) => {
  const { email, name, password, position, phone, company_name} = req.body;
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
  password = hash;

  try {
    // change data
    let data = {
      email: email,
      name: name,
      password: password,
      position: position,
      phone: phone,
      company_name: company_name,
    };

    const result = await UserRecModel.CreateUserRecModel(data);
    //seding email
    sendToMail(
      result.email,
      "Verify email",
      `<h1><a href="https://lazy-teal-piranha-vest.cyclic.cloud/recruiter/verify/${result.id}">VERIFY EMAIL!!</a></h1>`
    );

    return res.status(201).json({
      status: "succes",
      Message: "Your Create Data Success",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Bad request ",
      message: error.message,
    });
  }
};

//============================================ Login Controller ====================================

const loginController = async (req, res) => {
  const { email, password } = req.body;
  // Validation Email
  let emailVertifikasi = await getUserRecByEmail(email);
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

  // Payload
  const userData = emailVertifikasi.rows[0];
  const payload = {
    id: userData.id,
    name: userData.name,
    email: userData.email,
  };

  const token = jwt.sign(payload, proces.env.JWT_KEY, { expiresIn: "30d" });

  try {
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

//======================================== Activate User Rec Controller =======================
const activateUserRecController = async (req, res) => {
  const { id } = req.params;

  const findById = await getUserRecById(id);
  if (!findById)
    return res.status(409).json({
      status: "Failed",
      message: "wrong id or email",
    });

  const verifyingUserRec = await UserRecModel.ActivateUserRecModel(id);
  if (!verifyingUserRec)
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

//========================================= Export Login ====================================
module.exports = {
  GetUserRecByIdController,
  CreateUserRecController,
  loginController,
  activateUserRecController,
};
