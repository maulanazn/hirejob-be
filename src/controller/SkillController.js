const res = require('express/lib/response');
const { UpdateSkill, CreateSkill, ViewSkill } = require('../model/SkillWorkers');

// ====================================== Create and Update skill =============================

const CreateUpdateSkill = async (req, res) => {
  const dataPayload = req.payload;

  let payload = {
    user_name: dataPayload.name,
    user_id: dataPayload.id,
  };

  const body = req.body;

  try {
    const Vertifikasi = await ViewSkill(dataPayload.id);
    if (!Vertifikasi.rows[0]) {
      await CreateSkill(payload, body);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Create Skill',
      });
    } else {
      await UpdateSkill(body, payload.user_id);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Update Skill',
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'Bad Server ',
      message: error.message,
    });
  }
};

const ViewSkillController = async (req, res) => {
  const payload = req.payload.id;

  try {
    const view = await ViewSkill(payload);

    return res.status(200).json({
      status: ' Succes ',
      message: 'View Data ',
      data: view.rows[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 'Bad Server ',
      message: error.message,
    });
  }
};

module.exports = {
  CreateUpdateSkill,
  ViewSkillController,
};
