const mongoose = require('mongoose');
const { signup } = require('../controllers/admin.controller');

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://aminejbali32:W30wTZ8WaX8VpSc8@cluster0.7j5ozsq.mongodb.net/?retryWrites=true&w=majority"


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