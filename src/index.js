const express = require('express');
const app = express();

const UserAuth = require('./route/UserRoute');
const UserRecRoute = require('./route/UserRecRoute');
const BodataWorker = require('./route/BiodataWorkersRoute');
const skillworkers = require('./route/skillWorkers');
const chat = require('./route/chattingroute');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('HIREJOB REST API SERVER');
});
app.use('/user', UserAuth);
app.use('/recruiter', UserRecRoute);
app.use('/workers', BodataWorker);
app.use('/skill', skillworkers);
app.use('/chatting', chat);

app.listen(3001, () => {
  console.log(`Server Running On Port '${'3001'}'`);
});
