const nodemailer = require('nodemailer');

const notifyUser = async (emailObject, res) => {
    try {

        sendEmail(emailObject, res);

    } catch (error) {
        console.log(error);
    }
}

const notifyAdmin = async (emailObject, res) => {

    try {
        emailObject.destination = process.env.EMAIL;
        sendEmail(emailObject, res);

    } catch (error) {
        console.log(error);
    }

}



const sendEmail = async (emailObject, res) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,

        auth: {
            user: 'yo.yolioteam@gmail.com',
            pass: 'xpivwjfczizmvasq',
        },
    });

    let mailOptions = {
        from: {
            name: 'YOLIO CAREER',
            address: 'yo.yolioteam@gmail.com'
        },

        to: emailObject.destination,
        subject: emailObject.subject,
        html: emailObject.content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        }
    });

}


module.exports = {
    notifyAdmin,
    notifyUser,
    sendEmail
}