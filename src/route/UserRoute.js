const express = require('express');
const route = express.Router();

const UserControllers = require('../controller/UserController');

route.get('/candidate/in', UserControllers.GetUserByIdController);
route.post('/', UserControllers.CreateUserController);
route.get('/verify/:id', UserControllers.activateUserController);
route.post('/login/', UserControllers.loginController);

module.exports = route;
