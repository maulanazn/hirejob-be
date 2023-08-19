const { sender, transactionalEmailApi } = require('./../config/emailverification');

const sendToMail = (toMail, subject, text) => {
    const receivers = [{
        email: toMail
    }]
    transactionalEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: subject,
        textContent: text
    }).then(res => console.log(res))
    .catch(err => console.error(err.message));
}

module.exports = sendToMail;