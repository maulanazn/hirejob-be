const {
  createUpdatePortofolio,
  createWorkEXPController,
  updateWorksEXPController,
  getAllWorkEXPController,
  deleteWorksEXP,
} = require('../controller/BiodataWorkersController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const route = express.Router();

route.post('/portofolio', VertifikasiToken, upload.single('photo'), createUpdatePortofolio); // FOR PORTOFOLIO
route.post('/workexp', VertifikasiToken, createWorkEXPController); // Create Worker EXP
route.put('/workexp/:id', VertifikasiToken, updateWorksEXPController); // Update Worker EXP
route.get('/workexp', VertifikasiToken, getAllWorkEXPController);
route.delete('/workexp/:id', VertifikasiToken, deleteWorksEXP);

module.exports = route;
