const express = require('express');
const app = express();

const UserAuth = require('./route/UserRoute');
const UserRecRoute = require('./route/UserRecRoute');
const BodataWorker = require('./route/BiodataWorkersRoute');
const skillworkers = require('./route/skillWorkers');

app.use(express.json());

app.use('/user', UserAuth);
app.use('/recruiter', UserRecRoute);
app.use('/workers', BodataWorker);
app.use('/skill', skillworkers);

app.listen(3001, () => {
  console.log(`Server Running On Port '${'3001'}'`);
});
