const {
  CreateBiodata,
  CreateUpdatePortofolio,
  GetProtofoliocontroller,
  CreateWorkEXPController,
  UpdateWorksEXPController,
  GetAllWorkEXPController,
  DeleteWorksEXP,
  GetBioPhoto,
} = require('../controller/BiodataWorkersController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const route = express.Router();

route.get('/bio/photo/:id', VertifikasiToken, GetBioPhoto);
route.post('/', VertifikasiToken, CreateBiodata);
route.get('/', VertifikasiToken, GetProtofoliocontroller); // GET Portofolio
route.post('/portofolio', VertifikasiToken, upload.single('photo'), CreateUpdatePortofolio); // FOR PORTOFOLIO
route.post('/workexp', VertifikasiToken, CreateWorkEXPController); // Create Worker EXP
route.put('/workexp/:id', VertifikasiToken, UpdateWorksEXPController); // Update Worker EXP
route.get('/workexp', VertifikasiToken, GetAllWorkEXPController);
route.delete('/workexp/:id', VertifikasiToken, DeleteWorksEXP);

module.exports = route;
