const {
  createWorkEXPController,
  updateWorksEXPController,
  getAllWorkEXPController,
  deleteWorksEXP,
  postPortfolio,
  putPortfolio,
  getUserPortfolio,
  getWorkEXPIdController,
  deletePortofolioId,
  countUserPortfolio,
  countUserWorkExperience,
  getPortfolioId,
} = require('../controller/BiodataWorkersController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');
const upload = require('../midlleware/MulterPhoto');

const express = require('express');
const route = express.Router();

route.get('/portfolio/count', VertifikasiToken, countUserPortfolio);
route.get('/portfolio', VertifikasiToken, upload.single('photo'), getUserPortfolio);
route.get('/portfolio/:id', VertifikasiToken, getPortfolioId);
route.post('/portfolio', VertifikasiToken, upload.single('photo'), postPortfolio);
route.put('/portfolio/:id', VertifikasiToken, upload.single('photo'), putPortfolio);
route.delete('/portofolio/:id', VertifikasiToken, deletePortofolioId);
route.get('/workexp/count', VertifikasiToken, countUserWorkExperience);
route.post('/workexp', VertifikasiToken, upload.single('work_experience_photo'), createWorkEXPController);
route.put('/workexp/:id', VertifikasiToken, upload.single('work_experience_photo'), updateWorksEXPController);
route.get('/workexp', VertifikasiToken, getAllWorkEXPController);
route.get('/workexp/:id', VertifikasiToken, getWorkEXPIdController);
route.delete('/workexp/:id', VertifikasiToken, deleteWorksEXP);

module.exports = route;
