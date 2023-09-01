const cloudinary = require('../config/cloudinary');
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
  let photo = await cloudinary.uploader.upload(req.file.path, { Folders: 'profil' });
  
  let CreateData = {
    user_id: user_id,
    photo,
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

module.exports = {
  CreateBiodataRecruiter, 
};