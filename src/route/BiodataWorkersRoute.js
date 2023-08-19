const { CreateBiodata, CreateUpdatePortofolio, GetProtofoliocontroller, CreateWorkEXPController, UpdateWorksEXPController, GetAllWorkEXPController, DeleteWorksEXP, CreateandUpdatePhotoControler } = require('../controller/BiodataWorkers');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');
// const {} = require('../controller/');

const express = require('express');
const routeWorkers = express.Router();

routeWorkers.post('/', VertifikasiToken, CreateBiodata);
routeWorkers.get('/', VertifikasiToken, GetProtofoliocontroller); // GET Portofolio
routeWorkers.post('/portofolio', VertifikasiToken, upload.single('photo'), CreateUpdatePortofolio); // FOR PORTOFOLIO
routeWorkers.post('/workexp', VertifikasiToken, CreateWorkEXPController); // Create Worker EXP
routeWorkers.put('/workexp/:id', VertifikasiToken, UpdateWorksEXPController); // Update Worker EXP
routeWorkers.get('/workexp', VertifikasiToken, GetAllWorkEXPController);
routeWorkers.delete('/workexp/:id', VertifikasiToken, DeleteWorksEXP);
routeWorkers.post('/photoprofile', VertifikasiToken, upload.single('photo_profile'), CreateandUpdatePhotoControler);
module.exports = routeWorkers;
