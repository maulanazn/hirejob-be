const express = require('express');
const app = express();
const cors = require('cors');

const UserRoute = require('./route/UserRoute');
const UserRecRoute = require('./route/UserRecRoute');
const BioCandRoute = require('./route/BiodataWorkersRoute');
const ChatRoute = require('./route/ChattingRoute');

// const { init } = require('./config/WebSocket');
// const http = require('http');
// app.use(cors());
// const server = http.createServer(app);
// init(server);

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('HIREJOB REST API SERVER');
});

app.use('/', UserRoute);
app.use('/recruiter', UserRecRoute);
app.use('/worker', BioCandRoute);
app.use('/chatting', ChatRoute);

server.listen(3000, () => {
  console.log(`Server Running On Port '${'3000'}'`);
});
