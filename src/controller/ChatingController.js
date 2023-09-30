const ChatingModels = require('../model/ChatingModel');

const createFromcontroller = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;

  try {
    const user = await ChatingModels.validateUser(id);
    // console.log(user);

    const data = {
      user_id: id,
      user_name: user.rows[0].name,
      recruiter_id: payload.id,
      recruiter_name: payload.name,
    };

    console.log(data);

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

  let data = {
    form_message_id: id,
    sender_id: payload.id,
    user_name: payload.name,
    position: body.position,
    message_detail: body.message_detail,
  };

  try {
    console.log(payload.id);
    const validasi = await ChatingModels.validateMessage(id);
    console.log(validasi);
    // console.log(validasi);

    if (!validasi.rows[0]) {
      console.log('datanya disini');
      const chatdua = await ChatingModels.createChattingnext(data);
      res.status(201).json({
        status: 'Succes',
        message: 'Create Message Succes',
      });
    } else {
      let data1 = {
        form_message_id: id,
        sender_id: payload.id,
        user_name: payload.name,
        position: validasi.rows[0].position,
        message_detail: body.message_detail,
      };
      const chat = await ChatingModels.createChattingnext(data1);
      console.log('testing');

      res.status(201).json({
        status: 'Succes',

        message: 'Update Message Succes',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Bad request ',
      message: error.message,
    });
  }
};

// ================================================================ Show From =====================================

const showFromchatting = async (req, res) => {
  const payload = req.payload.id;
  console.log(payload);

  try {
    const user = await ChatingModels.viewFromValidation(payload);
    // console.log(user);

    if (user.rows[0]) {
      const user1 = await ChatingModels.showNameRec(payload);
      return res.status(200).json({
        status: 'Succes1',
        message: ' Show All Chat ',
        data: user1,
      });
    } else {
      const rec = await ChatingModels.showNameCandidate(payload);

      return res.status(200).json({
        status: 'Succes',
        message: ' Show All Chat ',
        data: rec,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: 'Bad request ',
      message: error.message,
    });
  }
};

const viewchatingController = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;

  try {
    const user = await ChatingModels.validateMessage(id);
    return res.status(200).json({
      status: 'Succes',
      message: ' Show All Chat ',
      data: user.rows,
    });
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
  viewchatingController,
};
