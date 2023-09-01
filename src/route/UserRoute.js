const express = require('express');
const route = express.Router();

const UserControllers = require('../controller/UserController');
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');
const { GetPortfolioPageViewController } = require('../controller/PortfolioViewController');

route.post('/register', UserControllers.CreateUserController);
route.post('/login/', UserControllers.loginController);
route.get('/in', VertifikasiToken, UserControllers.GetUserByIdController);
route.get('/portfolio-view/:id', VertifikasiToken, GetPortfolioPageViewController);
route.get('/verify/:id', UserControllers.activateUserController);

module.exports = route;
