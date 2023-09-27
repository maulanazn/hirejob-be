const Portofolio = require('../model/PortofolioWorkersModel.js');
const Workexp = require('../model/WorkExperienceModel.js');
const cloudinary = require('../config/cloudinary');

const getUserPortfolio = async (req, res) => {
  try {
    const result = await Portofolio.userPortfolio(req.payload.id);
    return res.status(201).json({
      status: ' Succes ',
      message: ' Succes getting user Portofolio',
      data: result.rows,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: error.message,
    });
  }
};

const postPortfolio = async (req, res) => {
  const payload = req.params.id;
  const { portfolio_name, repository_link, app_type, photo } = req.body;
  // const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

  let data = {
    portfolio_name,
    repository_link,
    app_type,
    photo: photo,
    user_id: payload,
  };

  try {
    const result = await Portofolio.createPortofolio(data);
    return res.status(201).json({
      status: ' Succes ',
      message: ' Succes Create Portofolio',
      data: result.rows,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: error.message,
    });
  }
};

const putPortfolio = async (req, res) => {
  const { portfolio_name, repository_link, app_type } = req.body;

  if (!req.file) {
    let data = {
      portfolio_name,
      repository_link,
      app_type,
      id: req.params.id
    };

    try {
      const result = await Portofolio.updatePortofolio(data);
      return res.status(201).json({
        status: ' Succes ',
        message: ' Succes update Portofolio',
        data: result.rows,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Bad request',
        message: error.message,
      });
    }
  }

  const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

  let data = {
    portfolio_name,
    repository_link,
    app_type,
    photo: photo.secure_url,
    id: req.params.id
  };

  try {
    const result = await Portofolio.updatePortofolio(data);
    return res.status(201).json({
      status: ' Succes ',
      message: ' Succes update Portofolio',
      data: result.rows,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      message: error.message,
    });
  }
};

const createWorkEXPController = async (req, res) => {
  const payload = req.payload;
  const { position, company_name, working_start_at, working_end_at, description } = req.body;

  let data = {
    user_name: payload.name,
    position,
    company_name,
    working_start_at,
    working_end_at,
    description,
    user_id: payload.id,
  };

  try {
    let dataCreate = await Workexp.createExperienceModel(data);
    res.status(201).json({
      status: ' Succes ',
      message: ' Create Data Succes',
      data: dataCreate.rows,
    });
  } catch (error) {
    res.status(400).json({
      status: ' Bad request',
      error: error.message,
    });
  }
};

const updateWorksEXPController = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;
  const { position, company_name, working_start_at, working_end_at, description } = req.body;

  let data = {
    user_name: payload.name,
    position,
    company_name,
    working_start_at,
    working_end_at,
    description,
    user_id: payload.id,
  };

  try {
    const Updatedata = await Workexp.updateExpModel(data, id);
    res.status(201).json({
      status: 'Succes',
      message: ' Succes Update Data',
      data: Updatedata,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Bad request',
      error: error.message,
    });
  }
};

const getAllWorkEXPController = async (req, res) => {
  const payload = req.payload.id;

  try {
    const GetallData = await Workexp.getAllWorkEXP(payload);
    res.status(200).json({
      status: ' Succes ',
      message: ' View All Data Exp',
      data: GetallData.rows,
    });
  } catch (error) {
    res.status(400).json({
      Status: 'Bad request',
      error: error.message,
    });
  }
};

const deleteWorksEXP = async (req, res) => {
  const { id } = req.params;

  try {
    await Workexp.deleteExpModel(id);
    res.status(200).json({
      status: ' Succes ',
      message: 'Delete Your Exp Succes ',
    });
  } catch (error) {
    res.status(400).json({
      Status: 'Bad request',
      error: error.message,
    });
  }
};

module.exports = {
  getUserPortfolio,
  postPortfolio,
  putPortfolio,
  createWorkEXPController,
  updateWorksEXPController,
  getAllWorkEXPController,
  deleteWorksEXP,
};
