const ModelProfil = require('../model/ProfilCandidate');

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

module.exports = {
  CreateBiodata,
};
