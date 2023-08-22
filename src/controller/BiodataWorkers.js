const ModelProfil = require('../model/ProfilCandidate');
const Portofolio = require('../model/ProtofolioWorkers');
const cloudinary = require('../config/cloudinary');
const Workexp = require('../model/WorkExperience');
const PhotoProfile = require('../model/PhotoProfile');

// ====== Get Biodata ===
const GetBioPhoto = async (req, res) => {
  const {id} = req.params;

  try {
    const result = await ModelProfil.GetBiodata(id);

    return res.status(200).json({
      status: 'Success',
      message: "SUccess get Bio photo",
      data: result.rows[0]
    })
  } catch (error) {
    return res.status(400).json({
      status: 'Failed',
      message: "Failed get Bio photo",
    })
  }
}

//==================================== Create Biodata =======================================

const CreateBiodata = async (req, res) => {
  const { user_name, province, city, last_work, description } = req.body;
  const payload = req.payload.id;

  let CreateData = {
    user_name,
    province,
    city,
    last_work,
    description,
    user_id: payload,
  };

  try {
    const Vertifikasi = await ModelProfil.GetBiodata(payload);
    if (!Vertifikasi.rows[0]) {
      let data = await ModelProfil.CreateProfilcontroller(CreateData);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Create Data',
        data: data,
      });
    } else {
      let data = await ModelProfil.UpdateProfilcontroller(CreateData, payload);
      return res.status(201).json({
        status: ' Succes',
        message: ' Update Your Biodata Succes',
        data: data,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'Bad Server ',
      message: error.message,
    });
  }
};
// ======================= Create AND Update  Portofolio =====================================================
const CreateUpdatePortofolio = async (req, res) => {
  const payload = req.payload;
  const { user_name, repository_link, app_type, photo } = req.body;
  const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  const url = cloudphotoProfil.url;

  let data = {
    user_name,
    repository_link,
    app_type,
    photo: photo.url,
    user_id: payload.id,
  };

  let data1 = {
    user_name,
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
    res.status(500).json({
      status: 'Bad Server ',
      message: error.message,
    });
  }
};
// ======================= Get Portofolio =====================================================
const GetProtofoliocontroller = async (req, res) => {
  const payload = req.payload.id;

  try {
    const data = await Portofolio.Validasi(payload);
    res.status(200).json({
      status: ' Succes',
      message: ' View Your Portfolio',
      data: data.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 'Bad Server ',
      message: error.message,
    });
  }
};

//=========================== Create Work Exp =================================================

const CreateWorkEXPController = async (req, res) => {
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
    let dataCreate = await Workexp.CreateExperienceModel(data);
    res.status(201).json({
      status: ' Succes ',
      message: ' Create Data Succes',
      data: dataCreate,
    });
  } catch (error) {
    res.status(500).json({
      status: ' Bad Server ',
      error: error.message,
    });
  }
};

//=========================== Update Work EXP ================================================
const UpdateWorksEXPController = async (req, res) => {
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
    res.status(500).json({
      status: ' Error ',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

// ============================ GET ALL Works EXP ============================================

const GetAllWorkEXPController = async (req, res) => {
  const payload = req.payload.id;

  try {
    const GetallData = await Workexp.GetAllWorkEXP(payload);
    res.status(200).json({
      status: ' Succes ',
      message: ' View All Data Exp',
      data: GetallData.rows,
    });
  } catch (error) {
    res.status(500).json({
      Status: ' error ',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

// ============================================== DELETE Work EXP ============================================

const DeleteWorksEXP = async (req, res) => {
  const { id } = req.params;

  try {
    await Workexp.DeleteExpModel(id);
    res.status(200).json({
      status: ' Succes ',
      message: 'Delete Your Exp Succes ',
    });
  } catch (error) {
    res.status(500).json({
      Status: ' error ',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

// =================================================== Create and Update Photo Profile ====================================

const CreateandUpdatePhotoControler = async (req, res) => {
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
    res.status(500).json({
      status: 'Faild',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

// ==================================================== Get Photo Profil Worker=======================

const GetPhotoWorkers = async (req, res) => {
  const payload = req.payload.id;

  try {
    const photo = await PhotoProfile.VertifikasiPhoto(payload);
    res.status(200).json({
      status: 'Succes',
      message: ' View Photo Profil',
      data: photo.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      status: 'Faild',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

module.exports = {
  GetBioPhoto,
  CreateBiodata,
  CreateUpdatePortofolio,
  GetProtofoliocontroller,
  CreateWorkEXPController,
  UpdateWorksEXPController,
  GetAllWorkEXPController,
  DeleteWorksEXP,
  CreateandUpdatePhotoControler,
  GetPhotoWorkers,
};
