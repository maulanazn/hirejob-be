const express = require('express');
const app = express();

const UserAuth = require('./route/UserRoute');

app.use(express.json());

app.use('/user', UserAuth);

app.listen(3001, () => {
  console.log(`Server Running On Port '${'3001'}'`);
});
