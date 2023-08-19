const SibApiV3SDK = require('sib-api-v3-sdk');
const dotenv = require('dotenv');
dotenv.config();

let sibClient = SibApiV3SDK.ApiClient.instance;
const apiKey = sibClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const transactionalEmailApi = new SibApiV3SDK.TransactionalEmailsApi();
const sender = {
    email: process.env.BREVO_EMAIL_SERVER
}

export {transactionalEmailApi, sender};