const express = require('express');
const app = express();

const UserAuth = require('./route/UserRoute');
const UserRecRoute = require('./route/UserRecRoute');

app.use(express.json());

app.use('/user', UserAuth);
app.use('/recruiter', UserRecRoute);

app.listen(3001, () => {
  console.log(`Server Running On Port '${'3001'}'`);
});
