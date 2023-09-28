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
  const payload = req.payload;
  const { portfolio_name, repository_link, app_type } = req.body;
  const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

  let data = {
    portfolio_name,
    repository_link,
    app_type,
    photo: photo.url,
    user_id: payload.id,
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
  const resultById = await Portofolio.showPortfolioById(req.params.id);

  if (!req.file) {
    let data = {
      portfolio_name: portfolio_name || resultById.rows[0].portfolio_name,
      repository_link: repository_link || resultById.rows[0].repository_link,
      app_type: app_type || resultById.rows[0].app_type,
      photo: resultById.rows[0].photo,
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
  } else {
    const photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  
    let data = {
      portfolio_name: portfolio_name || resultById.rows[0].portfolio_name,
      repository_link: repository_link || resultById.rows[0].repository_link,
      app_type: app_type || resultById.rows[0].app_type,
      photo: photo.secure_url || resultById.rows[0].photo,
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

};

const getWorkEXPIdController = async (req, res) => {
  const id = req.params.id;

  try {
    const getIdData = await Workexp.getWorkExpById(id);
    res.status(200).json({
      status: ' Succes ',
      message: ' View Id Data Exp',
      data: getIdData.rows,
    });
  } catch (error) {
    res.status(400).json({
      Status: 'Bad request',
      error: error.message,
    });
  }
};

const createWorkEXPController = async (req, res) => {
  const payload = req.payload;
  const { position, company_name, working_start_at, working_end_at, description } = req.body;

  if (!req.file) {
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
  } else {
    const work_experience_photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  
    let data = {
      user_name: payload.name,
      position,
      company_name,
      work_experience_photo: work_experience_photo.secure_url,
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
  }
};

const updateWorksEXPController = async (req, res) => {
  const { id } = req.params;
  const payload = req.payload;
  const { position, company_name, working_start_at, working_end_at, description } = req.body;
  const resultById = await Workexp.getWorkExpById(id);

  if (!req.file) {
    let data = {
      user_name: payload.name || resultById.rows[0].user_name,
      position: position || resultById.rows[0].position,
      company_name: company_name || resultById.rows[0].company_name,
      work_experience_photo: resultById.rows[0].work_experience_photo,
      working_start_at: working_start_at || resultById.rows[0].working_start_at,
      working_end_at: working_end_at || resultById.rows[0].working_end_at,
      description: description || resultById.rows[0].description,
      user_id: payload.id || resultById.rows[0].user_id,
    };
  
    try {
      const Updatedata = await Workexp.updateExpModel(data, id);
      res.status(201).json({
        status: 'Succes',
        message: ' Succes Update Data',
        data: Updatedata.rows,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Bad request',
        error: error.message,
      });
    }
  } else {
    const work_experience_photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  
    let data = {
      user_name: payload.name || resultById.rows[0].user_name,
      position: position || resultById.rows[0].position,
      company_name: company_name || resultById.rows[0].company_name,
      work_experience_photo: work_experience_photo.secure_url || resultById.rows[0].work_experience_photo,
      working_start_at: working_start_at || resultById.rows[0].working_start_at,
      working_end_at: working_end_at || resultById.rows[0].working_end_at,
      description: description || resultById.rows[0].description,
      user_id: payload.id || resultById.rows[0].id,
    };
  
    try {
      const Updatedata = await Workexp.updateExpModel(data, id);
      res.status(201).json({
        status: 'Succes',
        message: ' Succes Update Data',
        data: Updatedata.rows,
      });
    } catch (error) {
      res.status(400).json({
        status: 'Bad request',
        error: error.message,
      });
    }
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
  getWorkEXPIdController,
  deleteWorksEXP,
};
