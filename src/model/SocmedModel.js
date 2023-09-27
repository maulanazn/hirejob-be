const {v4: uuidv4} = require('uuid');
const {pool} = require('./../config/pg');

const showSocialMediaModel = async (user_id) => {
    try {
        const result = await pool.query("SELECT * FROM social_media WHERE user_id = $1", [user_id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const createSocialMediaModel = async (body, user_id) => {
    const id = uuidv4();

    try {
        const result = await pool.query("INSERT INTO social_media (id, user_id, social_media_name, link) VALUES($1, $2, $3, $4)", [id, user_id, body.social_media_name, body.link]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateSocialMediaModel = async (body, id) => {
    try {
        const result = await pool.query("UPDATE social_media SET social_media_name = $1, link = $2 WHERE id = $3", [body.social_media_name, body.link, id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteSocialMediaModel = async (id) => {
    try {
        const result = await pool.query("DELETE FROM social_media WHERE id = $1", [id]);

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    showSocialMediaModel,
    createSocialMediaModel,
    updateSocialMediaModel,
    deleteSocialMediaModel,
}