const Newsletter = require('../models/newsletter.model');

const { notifyAdmin, notifyUser, sendEmail } = require('./mailing.controller');

const create = async (req, res) => {

    try {
        let news = new Newsletter(req.body);
        let result = await news.save();
        let emailObject = {
            destination: news.email,
            subject: 'subscription notification',
            content: `<h1>New Subscription by : ${news.email}</h1>`
        }
        notifyAdmin(emailObject, res);

        emailObject.destination = news.email;
        emailObject.subject = 'Subscription notification';
        emailObject.content = `<h1>Your subscription has been sent</h1>`;
        notifyUser(emailObject, res);

        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getAll = async (req, res) => {

    try {

        let result = await Newsletter.aggregate([
            { $sort: { eid: 1, modifyDate: 1 } }
           
        ])

        res.status(200).json({
            newsletters: result
            
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

}

const deleteNewsLetter = async (req, res) => {

    try {

        let id = req.params.id;
        let result = await Newsletter.findByIdAndDelete({ _id: id });
        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const editNewsLetter = async (req, res) => {

    try {

        let id = req.params.id;
        let result = await Newsletter.findByIdAndUpdate({ _id: id }, req.body);
        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getNewsLetterByType = async (req, res) => {

    try {

        let { type } = req.params;
        let result = await Newsletter.find({ type: type });
        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const getNewsLetterByIdPost = async (req, res) => {

    try {

        let { idPost } = req.params;
        let result = await Newsletter.find({ idPost: idPost });
        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

const sendEmailToAllNewsLetterEmails = async (req, res) => {

    try {

        let emailObject = {
            destination: '',
            subject: req.body.subject,
            content: req.body.content
        }

        let newsletter = await Newsletter.find();
        for (let news of newsletter) {
            emailObject.destination = news.email;
            sendEmail(emailObject, res);
        }
        res.send({ message: 'mails sent' })

    } catch (error) {
        console.log(error);
    }

}

const sendEmailToSpecificNiche = async (req, res) => {

    try {

        let emailObject = {
            destination: '',
            subject: req.body.subject,
            content: req.body.content
        }

        let newsletter = await Newsletter.find({ idPost: req.params.idPost });
        for (let news of newsletter) {
            emailObject.destination = news.email;
            sendEmail(emailObject, res);
        }
        res.send('mails sent')

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

module.exports = {
    create,
    getAll,
    deleteNewsLetter,
    getNewsLetterByType,
    getNewsLetterByIdPost,
    sendEmailToAllNewsLetterEmails,
    sendEmailToSpecificNiche,
    editNewsLetter
}