const { CreateUpdateSkill, ViewSkillController } = require('../controller/SkillController');
const { VertifikasiToken } = require('../midlleware/VertifikasiToken');

const express = require('express');
const skillroute = express.Router();

//======================================

skillroute.post('/', VertifikasiToken, CreateUpdateSkill);
skillroute.get('/', VertifikasiToken, ViewSkillController);

module.exports = skillroute;
