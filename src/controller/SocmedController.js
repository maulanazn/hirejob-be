const { insertManyData, deleteFromMany, updateFromMany } = require('../lib/HelperQuery');
const SocialMediaModel = require('./../model/SocmedModel');

const getSocialMediaController = async (req, res) => {
    try {
        const result = await SocialMediaModel.showSocialMediaModel(req.payload.id)
        return res.status(200).json({
            status: 'success',
            message: 'success getting all social media',
            data: result.rows
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Bad request',
            message: error.message
        })
    }
}

const postSocialMediaController = async (req, res) => {
    try {
        insertManyData(req.body, req.payload.id);
        return res.status(201).json({
            status: 'success',
            message: 'success creating social media',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Bad request',
            message: error.message
        })
    }
}

const patchSocialMediaController = async (req, res) => {
    const {social_media_name, link} = req.body;
    const resultById = await SocialMediaModel.showSocialMediaByIdModel(req.params.id);

    let data = {
        social_media_name: social_media_name || resultById.rows[0].social_media_name,
        link: link || resultById.rows[0].link
    }

    try {
        updateFromMany(req.payload.id, data, req.params.id)
        
        return res.status(201).json({
            status: 'success',
            message: 'success updating social media',
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Bad request',
            message: error.message
        })
    }
}

const deleteSocialMediaController = async (req, res) => {
    try {
        deleteFromMany(req.payload.id, req.params.id)
        
        return res.status(200).json({
            status: 'success',
            message: 'success deleting social media'
        });
    } catch (error) {
        return res.status(400).json({
            status: 'Bad request',
            message: error.message
        })
    }
}

module.exports = {
    getSocialMediaController,
    postSocialMediaController,
    patchSocialMediaController,
    deleteSocialMediaController,
}