const express = require('express');
const router = express.Router();

const {
    create

} = require('../controllers/newsletter.controller');

router.post('/subscribe', create);


module.exports = router;