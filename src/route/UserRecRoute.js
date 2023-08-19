const express = require('express');
const route = express.Router();

const UserRecControllers = require('../controller/UserRecController');

route.post('/', UserRecControllers.CreateUserRecController);
route.get('/verify/:id', UserRecControllers.activateUserRecController);
route.post('/login/', UserRecControllers.loginController);

module.exports = route;
