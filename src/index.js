const express = require('express');
const app = express();
const cors = require('cors');

const UserRoute = require('./route/UserRoute');
const UserRecRoute = require('./route/UserRecRoute');
const BioCandRoute = require('./route/BiodataWorkersRoute');
const ChatRoute = require('./route/ChattingRoute');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
  res.send('HIREJOB REST API SERVER');
});
app.use('/', UserRoute);
app.use('/recruiter', UserRecRoute);
app.use('/worker', BioCandRoute);
app.use('/chatting', ChatRoute);

app.listen(3001, () => {
  console.log(`Server Running On Port '${'3001'}'`);
});
