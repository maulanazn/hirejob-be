const Portofolio = require('../model/ProtofolioWorkersModel.js');
const Workexp = require('../model/WorkExperienceModel.js');
const PhotoProfile = require('../model/PhotoProfile');

const cloudinary = require('../config/cloudinary');

const createUpdatePortofolio = async (req, res) => {
  const payload = req.payload;
  const { portfolio_name, repository_link, app_type, photo } = req.body;
  const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  const url = cloudphotoProfil.url;

  let data = {
    portfolio_name,
    repository_link,
    app_type,
    photo: photo.url,
    user_id: payload.id,
  };

  let data1 = {
    portfolio_name,
    repository_link,
    app_type,
    photo: url,
  };

  try {
    const Validasi = await Portofolio.Validasi(payload.id);
    if (!Validasi.rows[0]) {
      const create = await Portofolio.CreatePortofolio(data);
      return res.status(201).json({
        status: ' Succes ',
        message: ' Succes Create Portofolio',
        data: create,
      });
    } else {
      const update = await Portofolio.UpdatePortofolio(data1, payload.id);
      return res.status(201).json({
        status: ' Succes ',
        message: ' Succes update Portofolio',
        error: false,
        data: update,
      });
    }
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
      data: dataCreate,
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
    const Updatedata = await Workexp.UpdateExpModel(data, id);
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
    const GetallData = await Workexp.GetAllWorkEXP(payload);
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

const createAndUpdatePhotoControler = async (req, res) => {
  const payload = req.payload;

  try {
    const validasi = await PhotoProfile.VertifikasiPhoto(payload.id);
    if (!validasi.rows[0]) {
      const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
      let data = {
        user_id: payload.id,
        photo_profile: cloudphotoProfil.url,
        user_name: payload.name,
      };
      console.log('ini update');
      const CreateData = await PhotoProfile.CreatePhotoProfile(data);
      return res.status(201).json({
        status: 'succes',
        message: ' Succes Create photo',
        error: false,
        data: CreateData,
      });
    } else {
      await cloudinary.uploader.destroy(req.file.path);
      const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

      let data = {
        photo_profile: cloudphotoProfil.url,
      };
      const UpdatedataPhoto = await PhotoProfile.UpdatePhotoProfil(data, payload.id);
      return res.status(201).json({
        status: 'succes',
        message: ' Succes Update photo',
        error: false,
        data: UpdatedataPhoto,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'Bad Request',
      error: error.message,
    });
  }
};

module.exports = {
  createUpdatePortofolio,
  createWorkEXPController,
  updateWorksEXPController,
  getAllWorkEXPController,
  deleteWorksEXP,
  createAndUpdatePhotoControler,
};
