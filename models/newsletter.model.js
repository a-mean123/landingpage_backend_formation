const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({

    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    tel: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    date: {
        type: Date,
        default: new Date()
    },
    pfe: {
        type: Boolean
    },
    method: {
        type: String,
    },
    place: {
        type: String,
    },
})

module.exports = mongoose.model('Newsletter', newsletterSchema);