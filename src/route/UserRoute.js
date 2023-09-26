const express = require('express');
const route = express.Router();

const UserControllers = require('../controller/UserController');
const { VertifikasiToken } = require('./../midlleware/VertifikasiToken');
const { getPortPageViewController } = require('../controller/PortfolioViewController');


route.post('/register', UserControllers.createUserController);
route.post('/login', UserControllers.loginController);
route.post('/update', VertifikasiToken, UserControllers.updateProfile);
route.get('/in', VertifikasiToken, UserControllers.getUserByIdController);
route.get('/portfolio-view/:id', VertifikasiToken, getPortPageViewController);
route.get('/verify/:id', UserControllers.activateUserController);
route.get('/allCandidate', VertifikasiToken, UserControllers.getAllUserController);

module.exports = route;
