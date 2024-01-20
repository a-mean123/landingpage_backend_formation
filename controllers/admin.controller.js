const Admin = require('../models/admin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async () => {

    try {

        let existAdmin = await Admin.find();
        if (existAdmin.length == 0) {
            let data = {
                fullname: 'YOLIO CAREER',
                email: process.env.EMAIL,
                password: process.env.ADMIN_PASS
            }
            let admin = new Admin(data);
            let salt = bcrypt.genSaltSync(10);
            admin.password = bcrypt.hashSync(data.password, salt);
            await admin.save();
            console.log('admin created , you can now use the application:)');
        }

    } catch (error) {
        console.log(error);
    }

}


const signin = async (req, res) => {

    try {
        let { email, password } = req.body;
        let admin = await Admin.findOne({ email: email });
        if (!admin) {
            res.status(401).send('email or password invalid');
        } else {
            let validPass = bcrypt.compareSync(password, admin.password);
            if (!validPass) {
                res.status(401).send('email or password invalid');
            } else {
                let payload = {
                    _id: admin._id,
                    fullname: admin.fullname,
                    email: admin.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN);
                res.status(200).send({ token: token });
            }
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


const update = async (req, res) => {

    try {
        let id = req.params.id;
        let data = req.body;
        if (data.password) {
            let salt = bcrypt.genSaltSync(10);
            data.password = bcrypt.hashSync(data.password, salt);
        }

        await Admin.findByIdAndUpdate({ _id: id }, data);
        let admin = await Admin.findById({ _id: id });
        let payload = {
            _id: admin._id,
            fullname: admin.fullname,
            email: admin.email
        }
        let token = jwt.sign(payload, process.env.SECRET_KEY_ADMIN, { expiresIn: '12h' });
        res.status(200).send({ token: token });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }

}




module.exports = {
    signup,
    signin,
    update
}