const { CreatePhotoRecProfile, VertifikasiPhotoRec, UpdatePhotoRecProfil } = require("../model/PhotoRecProfile");
const cloudinary = require('./../config/cloudinary');
const {
  CreateProfileRecruiter,
  GetProfileRecruiter,
  UpdateProfileRecruiter,
} = require("../model/ProfilRecruiter");

const CreateBiodataRecruiter = async (req, res) => {
  const {
    company_name,
    company_field,
    province,
    city,
    company_info,
    email,
    company_email,
    company_phone,
    linkedin_url
  } = req.body;
  const user_id = req.payload.id;

  let CreateData = {
    user_id: user_id,
    company_name,
    company_field,
    province,
    city,
    company_info,
    email,
    company_email,
    company_phone,
    linkedin_url
  };

  try {
    const verifyBioRec = await GetProfileRecruiter(user_id);
    if (!verifyBioRec.rows[0]) {
      let createBioRec = await CreateProfileRecruiter(CreateData);
      return res.status(201).json({
        status: ' Succes',
        message: ' Succes Create Data',
        data: createBioRec
      });
    } else {
        let updateBioRec = await UpdateProfileRecruiter(CreateData, user_id);
        return res.status(201).json({
          status: ' Succes',
          message: ' Succes Update Data',
          data: updateBioRec
        });
    }
  } catch (error) {
    return res.status(500).json({
      status: 'Error',
      message: ' Failed Serever',
      data: error.message
    });
  }
};

// =================================================== Create and Update Photo Profile ====================================

const CreateandUpdatePhotoControler = async (req, res) => {
  const payload = req.payload;

  try {
    console.log('ini validasi');
    const validasi = await VertifikasiPhotoRec(payload.id);
    console.log(validasi);
    if (!validasi.rows[0]) {
      const cloudPhotoRecProfile = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
      let data = {
        user_id: payload.id,
        photo_profile: cloudPhotoRecProfile.url,
        user_name: payload.name,
      };
      console.log('ini update');
      const CreateData = await CreatePhotoRecProfile(data);
      return res.status(201).json({
        status: 'succes',
        message: ' Succes Create photo',
        error: false,
        data: CreateData,
      });
    } else {
      await cloudinary.uploader.destroy(req.file.path);
      const cloudPhotoRecProfile = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });

      let data = {
        photo_profile: cloudPhotoRecProfile.url,
      };

      const UpdatedataPhoto = await UpdatePhotoRecProfil(data, payload.id);
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
  CreateBiodataRecruiter, 
  CreateandUpdatePhotoControler
};