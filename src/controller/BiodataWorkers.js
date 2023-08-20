const ModelProfil = require('../model/ProfilCandidate');
const Portofolio = require('../model/ProtofolioWorkers');
const cloudinary = require('../config/cloudinary');
const Workexp = require('../model/WorkExperience');
const PhotoProfile = require('../model/PhotoProfile');

//==================================== Create Biodata =======================================

const CreateBiodata = async (req, res) => {
  const { user_name, province, city, last_work, description } = req.body;
  const body = req.body;
  const payload = req.payload.id;
  console.log('ini error');
  console.log(payload);

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
    console.log('a');
    if (!Vertifikasi.rows[0]) {
      let data = await ModelProfil.CreateProfilcontroller(CreateData);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Create Data',
        error: false,
        data: data,
      });
    } else {
      console.log('error');
      let data = await ModelProfil.UpdateProfilcontroller(CreateData, payload);
      return res.status(201).json({
        status: ' Succes',
        message: ' Update Your Biodata Succes',
        error: false,
        data: data,
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
// ======================= Create AND Update  Portofolio =====================================================
const CreateUpdatePortofolio = async (req, res) => {
  const payload = req.payload;
  console.log(payload);
  const { user_name, repository_link, app_type, photo, created_at } = req.body;
  const cloudphotoProfil = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  console.log(cloudphotoProfil);
  const url = cloudphotoProfil.url;
  console.log(url);
  console.log('ini data Setelah CLoud');

  let data = {
    user_name,
    repository_link,
    app_type,
    photo: url,

    user_id: payload.id,
  };
  console.log('data');
  console.log(data);

  let data1 = {
    user_name,
    repository_link,
    app_type,
    photo: url,
  };

  try {
    const Validasi = await Portofolio.Validasi(payload.id);
    console.log(Validasi);
    if (!Validasi.rows[0]) {
      console.log('ini error');
      const create = await Portofolio.CreatePortofolio(data);
      console.log(create);
      return res.status(201).json({
        status: ' Succes ',
        message: ' Succes Create Portofolio',
        error: false,
        dataview: create,
      });
    } else {
      const update = await Portofolio.UpdatePortofolio(data1, payload.id);
      return res.status(201).json({
        status: ' Succes ',
        message: ' Succes update Portofolio',
        error: false,
        dataview: update,
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
// ======================= Get Portofolio =====================================================
const GetProtofoliocontroller = async (req, res) => {
  const payload = req.payload.id;
  console.log(payload);

  try {
    const data = await Portofolio.Validasi(payload);
    console.log(data);
    res.status(200).json({
      status: ' Succes',
      message: ' View Your Portfolio',
      error: false,
      data: data.rows[0],
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
      error: false,
      data: dataCreate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: ' faild ',
      message: ' Bad Server ',
      error: error.message,
    });
  }

  // console.log(error);

  // return console.log(data);
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
      error: false,
      data: Updatedata,
    });
  } catch (error) {
    console.log(error);
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
      error: false,
      data: GetallData.rows,
    });
  } catch (error) {
    console.log(error);
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
      error: false,
    });
  } catch (error) {
    console.log(error);
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
    console.log('ini validasi');
    const validasi = await PhotoProfile.VertifikasiPhoto(payload.id);
    console.log(validasi);
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
      console.log('ini update');
      const UpdatedataPhoto = await PhotoProfile.UpdatePhotoProfil(data, payload.id);
      return res.status(201).json({
        status: 'succes',
        message: ' Succes Update photo',
        error: false,
        data: UpdatedataPhoto,
      });
    }
  } catch (error) {
    res.status(201).json({
      status: 'Faild',
      message: ' Bad Server',
      error: error.message,
    });
  }
};

module.exports = {
  CreateBiodata,
  CreateUpdatePortofolio,
  GetProtofoliocontroller,
  CreateWorkEXPController,
  UpdateWorksEXPController,
  GetAllWorkEXPController,
  DeleteWorksEXP,
  CreateandUpdatePhotoControler,
};
