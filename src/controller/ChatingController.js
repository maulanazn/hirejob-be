const { SubAccountsResponse } = require('sib-api-v3-sdk');
const ChatingModels = require('../model/ChatingModel');

// ========================================================== Create Chating======================================

const CreateFromcontroller = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;
  const body = req.body;

  try {
    const user = await ChatingModels.ValidateUser(id);

    console.log(user.rows[0].name);
    const data = {
      user_id: id,
      user_name: user.rows[0].name,
      recruiter_id: payload.id,
      recruiter_name: payload.name,
    };
    console.log('data');
    console.log(data);
    const createFrom = await ChatingModels.FromChattingModel(data);
    res.status(201).json({
      status: 'Succes',
      message: 'Succes Create From Chat',
      data: createFrom,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

// ================================================================ Create Chatting =======================================

const CreateChatting = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;
  const body = req.body;

  let data1 = {
    id_chat: id,
    id_pengirim: payload.id,
    name: payload.name,
    position: body.position,
    message_detail: body.message_detail,
  };

  let data = {
    id_chat: id,
    id_pengirim: payload.id,
    name: payload.name,
    message_detail: body.message_detail,
  };

  try {
    const validasi = await ChatingModels.Validatemessage(id);
    console.log(validasi.rows[0]);

    if (!validasi) {
      const chat = await ChatingModels.CreateChatting(data1);
      res.status(201).json({
        status: 'Succes',
        message: 'Create Message Succes',
        data: chat,
      });
    } else {
      console.log('Ini Data Tanpa Position');
      let data = {
        id_chat: id,
        id_pengirim: payload.id,
        name: payload.name,
        position: validasi.rows[0].position,
        message_detail: body.message_detail,
      };
      const chatdua = await ChatingModels.CreateChattingnext(data);
      res.status(201).json({
        status: 'Succes',
        message: 'Update Message Succes',
        data: chatdua,
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

// ================================================================ Show From =====================================

const ShowFromchatting = async (req, res) => {
  const payload = req.payload.id;

  try {
    const user = await ChatingModels.ViewFromValidasi(payload);

    if (user.rows[0]) {
      return res.status(200).json({
        status: 'Succes',
        message: ' Show All Chat ',
        data: user,
      });
    } else {
      const rec = await ChatingModels.ViewFromValidasirect(payload);

      return res.status(200).json({
        status: 'Succes',
        message: ' Show All Chat ',
        data: rec.rows,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Error ',
      message: 'Bad Server ',
      message: error.message,
    });
  }
};

//=================================================== Module Exports =========================================

module.exports = {
  CreateFromcontroller,
  CreateChatting,
  ShowFromchatting,
};
