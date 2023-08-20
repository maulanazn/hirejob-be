const express = require('express');
const route = express.Router();

const UserControllers = require('../controller/UserController');
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');

route.get('/candidate/in', VertifikasiToken, UserControllers.GetUserByIdController);
route.post('/', UserControllers.CreateUserController);
route.get('/verify/:id', UserControllers.activateUserController);
route.post('/login/', UserControllers.loginController);

module.exports = route;
