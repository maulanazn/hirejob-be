const express = require('express');
const route = express.Router();
const {VertifikasiToken} = require('./../midlleware/VertifikasiToken');
const upload = require('./../midlleware/MulterPhoto');

const UserRecControllers = require('../controller/UserRecController');
const { CreateBiodataRecruiter, CreateandUpdatePhotoControler } = require('../controller/BiodataRecruiter');
const { GetAllUserController } = require('../controller/UserController');

route.get('/all-candidate', VertifikasiToken, GetAllUserController);
route.get('/in', VertifikasiToken, UserRecControllers.GetUserRecByIdController);
route.post('/', UserRecControllers.CreateUserRecController);
route.get('/verify/:id', UserRecControllers.activateUserRecController);
route.post('/login/', UserRecControllers.loginController);
route.post('/photoprofile', VertifikasiToken, upload.single('photo_profile'), CreateandUpdatePhotoControler);
route.post('/bio-recruiter', VertifikasiToken, CreateBiodataRecruiter);

module.exports = route;
