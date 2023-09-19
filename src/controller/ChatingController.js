const ChatingModels = require('../model/ChatingModel');

const createFromcontroller = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;

  try {
    const user = await ChatingModels.validateUser(id);

    const data = {
      user_id: id,
      user_name: user.rows[0].name,
      recruiter_id: payload.id,
      recruiter_name: payload.name,
    };

    const createFrom = await ChatingModels.fromChattingModel(data);
    return res.status(201).json({
      status: 'Succes',
      message: 'Succes Create From Chat',
      data: createFrom,
    });
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request ',
      message: error.message,
    });
  }
};

const createChatting = async (req, res) => {
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
    const validasi = await ChatingModels.validateMessage(id);

    if (!validasi) {
      const chat = await ChatingModels.createChatting(data1);
      res.status(201).json({
        status: 'Succes',
        message: 'Create Message Succes',
        data: chat,
      });
    } else {
      let data = {
        id_chat: id,
        id_pengirim: payload.id,
        name: payload.name,
        position: validasi.rows[0].position,
        message_detail: body.message_detail,
      };

      const chatdua = await ChatingModels.createChattingnext(data);
      res.status(201).json({
        status: 'Succes',
        message: 'Update Message Succes',
        data: chatdua,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: 'Bad request ',
      message: error.message,
    });
  }
};

// ================================================================ Show From =====================================

const showFromchatting = async (req, res) => {
  const payload = req.payload.id;

  try {
    const user = await ChatingModels.viewFromValidation(payload);

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
    return res.status(400).json({
      status: 'Bad request ',
      message: error.message,
    });
  }
};

//=================================================== Module Exports =========================================

module.exports = {
  createFromcontroller,
  createChatting,
  showFromchatting,
};
