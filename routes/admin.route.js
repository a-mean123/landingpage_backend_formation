const express = require('express');
const router = express.Router();
const {
    signin,
    update,
} = require('../controllers/admin.controller');
const { verifyTokenAdmin } = require('../config/middlware/auth');



router.post('/signin', signin);
router.put('/update/:id',verifyTokenAdmin ,update);



module.exports = router;