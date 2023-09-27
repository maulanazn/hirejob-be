const express = require('express');
const route = express.Router();
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');
const upload = require('./../midlleware/MulterPhoto');

const UserRecControllers = require('../controller/UserRecController');

route.post('/register', UserRecControllers.createUserRecController);
route.post('/login', UserRecControllers.loginController);
route.post('/update', VertifikasiToken, upload.single('photo'), UserRecControllers.updateRecProfile);
route.get('/in', VertifikasiToken, UserRecControllers.getUserRecByIdController);

module.exports = route;
