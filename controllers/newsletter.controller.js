const Newsletter = require('../models/newsletter.model');



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



module.exports = {
    create
}