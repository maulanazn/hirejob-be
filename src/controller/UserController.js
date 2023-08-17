const UserModel = require('../model/UserModel');
const { getUserByEmail } = require('../model/Auth');
const { hashPassword } = require('../midlleware/hashing');

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
      password: req.body.password,
      nama: req.body.nama,
      phone: req.body.phone,
      jabatan: req.body.jabatan,
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

module.exports = {
  CreateUserController,
};
