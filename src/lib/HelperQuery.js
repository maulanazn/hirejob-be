const SocmedModel = require("../model/SocmedModel");

async function insertManyData(dataValue, user_id) {
    for (const value of dataValue) {
        await SocmedModel.createSocialMediaModel(value, user_id)
    }
}

async function updateFromMany(user_id, body, id) {
    const result = await SocmedModel.showSocialMediaModel(user_id);

    result.rows.some(async (item, _) => {
        if (id != item.id) {
            return
        } else {
            return await SocmedModel.updateSocialMediaModel(body, id)
        }
    })
}

async function deleteFromMany(user_id, id) {
    const result = await SocmedModel.showSocialMediaModel(user_id);

    result.rows.some(async (item, _) => {
        if (id != item.id) {
            return
        } else {
            return await SocmedModel.deleteSocialMediaModel(id)
        }
    })
}

module.exports = {
    insertManyData,
    deleteFromMany,
    updateFromMany,
}