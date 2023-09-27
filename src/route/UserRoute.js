const express = require('express');
const route = express.Router();
const upload = require('../midlleware/MulterPhoto');

const UserControllers = require('../controller/UserController');
const { VertifikasiToken } = require('./../midlleware/VertifikasiToken');
const { getPortfolioPageViewController } = require('../controller/PortfolioViewController');

route.post('/register', UserControllers.createUserController);
route.post('/login', UserControllers.loginController);
route.post('/update', VertifikasiToken, upload.single('photo'), UserControllers.updateProfile);
route.get('/in', VertifikasiToken, UserControllers.getUserByIdController);
route.get('/portfolio-view/:id', VertifikasiToken, getPortfolioPageViewController);
route.get('/candidates', VertifikasiToken, UserControllers.getAllUserController);

module.exports = route;
