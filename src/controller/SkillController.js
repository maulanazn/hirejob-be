const res = require('express/lib/response');
const { UpdateSkill, CreateSkill, ViewSkill } = require('../model/SkillWorkers');

// ====================================== Create and Update skill =============================

const CreateUpdateSkill = async (req, res) => {
  const dataPayload = req.payload;

  let payload = {
    user_name: dataPayload.name,
    user_id: dataPayload.id,
  };

  //   return console.log(payload);
  const body = req.body;

  try {
    const Vertifikasi = await ViewSkill(dataPayload.id);
    // return console.log(Vertifikasi);
    if (!Vertifikasi.rows[0]) {
      const create = await CreateSkill(payload, body);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Create Skill',
        error: false,
        data: create,
      });
    } else {
      const Update = await UpdateSkill(body, payload.user_id);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Update Skill',
        error: false,
        data: Update,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

const ViewSkillController = async (req, res) => {
  const payload = req.payload.id;

  try {
    const view = await ViewSkill(payload);
    // console.log(view);
    const data = view.rows[0].skill_name;
    const datafix = data.split(' ');
    console.log(datafix);

    res.status(200).json({
      status: ' Succes ',
      message: 'View Data ',
      error: false,
      data: datafix,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateUpdateSkill,
  ViewSkillController,
};
