const SocmedModel = require("../model/SocmedModel");

async function insertManyData(dataValue, user_id) {
    for (const value of dataValue) {
        await SocmedModel.createSocialMediaModel(value, user_id)
    }
}

module.exports = {
    insertManyData
}