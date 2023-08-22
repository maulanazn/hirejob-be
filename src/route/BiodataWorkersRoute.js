const {
  GetPhotoWorkers,
  CreateBiodata,
  CreateUpdatePortofolio,
  GetProtofoliocontroller,
  CreateWorkEXPController,
  UpdateWorksEXPController,
  GetAllWorkEXPController,
  DeleteWorksEXP,
  CreateandUpdatePhotoControler,
  GetBioPhoto,
} = require('../controller/BiodataWorkers');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const routeWorkers = express.Router();

routeWorkers.get('/bio/photo/:id', VertifikasiToken, GetBioPhoto);
routeWorkers.post('/', VertifikasiToken, CreateBiodata);
routeWorkers.get('/photo/profil/', VertifikasiToken, GetPhotoWorkers);
routeWorkers.get('/', VertifikasiToken, GetProtofoliocontroller); // GET Portofolio
routeWorkers.post('/portofolio', VertifikasiToken, upload.single('photo'), CreateUpdatePortofolio); // FOR PORTOFOLIO
routeWorkers.post('/workexp', VertifikasiToken, CreateWorkEXPController); // Create Worker EXP
routeWorkers.put('/workexp/:id', VertifikasiToken, UpdateWorksEXPController); // Update Worker EXP
routeWorkers.get('/workexp', VertifikasiToken, GetAllWorkEXPController);
routeWorkers.delete('/workexp/:id', VertifikasiToken, DeleteWorksEXP);
routeWorkers.post('/photoprofile', VertifikasiToken, upload.single('photo_profile'), CreateandUpdatePhotoControler);
module.exports = routeWorkers;
