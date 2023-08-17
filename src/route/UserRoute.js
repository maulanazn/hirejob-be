const express = require('express');
const route = express.Router();

const UserControllers = require('../controller/UserController');

route.post('/', UserControllers.CreateUserController);
route.post('/login/', UserControllers.loginController);

module.exports = route;
