const Newsletter = require('../models/newsletter.model');



const create = async (req, res) => {

    try {
        let news = new Newsletter(req.body);
        let result = await news.save();
    
  

        res.status(200).send(result);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}



module.exports = {
    create
}