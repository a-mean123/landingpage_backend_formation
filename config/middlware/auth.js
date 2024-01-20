const jwt = require('jsonwebtoken');





const verifyTokenAdmin = async (req, res, next) => {

    try {

        const decoded = await jwt.verify(req.headers.authorization.split(' ')[1], process.env.SECRET_KEY_ADMIN);
        req.admin = decoded;
     
        next();
    } catch (err) {

        res.status(400).send('invalid token');
    }

}


module.exports = {

    verifyTokenAdmin,

}