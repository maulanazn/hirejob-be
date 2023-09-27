const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserModel = require('../model/UserModel');
const { getUserByEmail, getUserById } = require('../model/AuthModel');
const { hashPassword, comparePassword } = require('../midlleware/hashing');
const cloudinary = require('./../config/cloudinary');

const getAllUserController = async (req, res) => {
  const { search, sortBy, sort, offset, limit } = req.query;

  const pageSearched = offset || 1;
  const limitation = limit || 5;

  const data = {
    search: search || undefined,
    sortBy: sortBy || 'name',
    sort: sort || '',
    offset: (pageSearched - 1) * limitation,
    limit: limit || 10,
  };

  if (search) {
    const resultUserSearch = await UserModel.searchAllUserModel(data);

    return res.status(200).json({
      status: 'succes',
      Message: 'Success get all user',
      data: resultUserSearch.rows,
    });
  }

  try {
    const resultUsers = await UserModel.getAllUserModel(data);

    return res.status(200).json({
      status: 'succes',
      Message: 'Success get all user',
      data: resultUsers.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      data: error.message,
    });
  }
};

const getUserByIdController = async (req, res) => {
  const id = req.payload.id;

  try {
    const resultUserById = await getUserById(id);

    return res.status(200).json({
      status: 'succes',
      Message: 'Success get by id',
      data: resultUserById.rows[0],
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
      data: error.message,
    });
  }
};

const createUserController = async (req, res) => {
  let { email, name, password, phone, position } = req.body;

  let emailVertifikasi = await getUserByEmail(email);
  if (emailVertifikasi.rows[0]) {
    return res.status(409).json({
      status: ' fail',
      message: 'Email already exists.',
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
    };

    let result = await UserModel.createUserModel(data);

    return res.status(201).json({
      status: 'succes',
      Message: 'Your Create Data Success, please check your email',
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;
  let emailVertifikasi = await getUserByEmail(email);
  if (!emailVertifikasi.rows[0]) {
    return res.status(409).json({
      error: 'Invalid email.',
      message: 'The email address you entered is not valid. Please enter a valid email address.',
    });
  }

  const pwd = emailVertifikasi.rows[0].password; // get properti password

  let VertifikasiLogin = await comparePassword({
    passReq: password,
    passData: pwd,
  });
  if (!VertifikasiLogin) {
    return res.status(401).json({
      status: 'failed',
      message: ' Your Password Authentication failed.',
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
      status: 'Succes',
      message: ' Login Succes',
      data: token,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad Request',
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  const id = req.payload.id;
  let { name, position, domicile, last_work, description, skill_name } = req.body;
  const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

  try {
    let data = {
      name: name,
      position: position,
      domicile: domicile,
      last_work: last_work,
      description: description,
      photo: photo.secure_url,
      skill_name: skill_name,
    };

    const result = await UserModel.updateUserModel(data, id);

    return res.status(201).json({
      status: 'succes',
      Message: 'Your Update Data Success',
      data: result.rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request',
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
};
