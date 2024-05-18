const mongoose = require('mongoose');
const { signup } = require('../controllers/admin.controller');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aminejbali32:123456789A@cluster0.e6a3hy6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(MONGODB_URI)
    .then(
        () => {
            signup();
            console.log('connected');
        }
    )
    .catch(
        (err) => {
            console.log(err);
        }
    )