const { CreateBiodata } = require('../controller/BiodataWorkers');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');

const express = require('express');
const routeWorkers = express.Router();

routeWorkers.post('/', VertifikasiToken, CreateBiodata);

module.exports = routeWorkers;
