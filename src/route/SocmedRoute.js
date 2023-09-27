const SocmedController = require('./../controller/SocmedController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const route = express.Router();

route.get('/', VertifikasiToken, SocmedController.getSocialMediaController);
route.post('/create', VertifikasiToken, SocmedController.postSocialMediaController);
route.patch('/update/:id', VertifikasiToken, SocmedController.patchSocialMediaController);
route.delete('/delete/:id', VertifikasiToken, SocmedController.deleteSocialMediaController);

module.exports = route;
