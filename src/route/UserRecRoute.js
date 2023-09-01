const express = require('express');
const route = express.Router();
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');
const upload = require('./../midlleware/MulterPhoto');

const UserRecControllers = require('../controller/UserRecController');
const { CreateBiodataRecruiter } = require('../controller/BiodataRecruiterController');
const { GetAllUserController } = require('../controller/UserController');

route.post('/register', UserRecControllers.CreateUserRecController);
route.post('/login/', UserRecControllers.loginController);
route.get('/candidate-list', VertifikasiToken, GetAllUserController);
route.get('/in', VertifikasiToken, UserRecControllers.GetUserRecByIdController);
route.get('/verify/:id', UserRecControllers.activateUserRecController);
route.post('/bio', VertifikasiToken, CreateBiodataRecruiter);

module.exports = route;
