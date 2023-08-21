const chattingController = require('../controller/Chating');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');

const express = require('express');
const Chatroute = express.Router();

//======================================

Chatroute.post('/chat/:id', VertifikasiToken, chattingController.CreateFromcontroller);
Chatroute.post('/createchat/:id', VertifikasiToken, chattingController.CreateChatting);
Chatroute.get('/ViewAllchat', VertifikasiToken, chattingController.ShowFromchatting);

module.exports = Chatroute;
