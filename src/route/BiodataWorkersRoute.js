const {
  createWorkEXPController,
  updateWorksEXPController,
  getAllWorkEXPController,
  deleteWorksEXP,
  postPortfolio,
  putPortfolio,
  getUserPortfolio,
} = require('../controller/BiodataWorkersController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const route = express.Router();

route.get('/portfolio', VertifikasiToken, upload.single('photo'), getUserPortfolio);
route.post('/portfolio/:id', VertifikasiToken, upload.single('photo'), postPortfolio);
route.put('/portfolio/:id', VertifikasiToken, upload.single('photo'), putPortfolio);
route.post('/workexp', VertifikasiToken, createWorkEXPController);
route.put('/workexp/:id', VertifikasiToken, updateWorksEXPController);
route.get('/workexp', VertifikasiToken, getAllWorkEXPController);
route.delete('/workexp/:id', VertifikasiToken, deleteWorksEXP);

module.exports = route;
