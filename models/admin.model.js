const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Admin', adminSchema);