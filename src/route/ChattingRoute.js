const chattingController = require('../controller/ChatingController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');

const express = require('express');
const Chatroute = express.Router();

Chatroute.post('/chat/:id', VertifikasiToken, chattingController.createFromcontroller);
Chatroute.post('/createchat/:id', VertifikasiToken, chattingController.createChatting);
Chatroute.get('/ViewAllchat', VertifikasiToken, chattingController.showFromchatting);
Chatroute.get('/Viewchating/:id', VertifikasiToken, chattingController.viewchatingController);

module.exports = Chatroute;
