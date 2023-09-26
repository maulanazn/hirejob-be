const express = require('express');
const route = express.Router();
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');
const upload = require('./../midlleware/MulterPhoto');

const UserRecControllers = require('../controller/UserRecController');
const { getAllUserController } = require('../controller/UserController');

route.post('/register', UserRecControllers.createUserRecController);
route.post('/login', UserRecControllers.loginController);
route.post('/update', UserRecControllers.updateRecProfile);
route.get('/candidate-list', VertifikasiToken, getAllUserController);
route.get('/in', VertifikasiToken, UserRecControllers.getUserRecByIdController);
route.get('/verify/:id', UserRecControllers.activateUserRecController);

module.exports = route;
