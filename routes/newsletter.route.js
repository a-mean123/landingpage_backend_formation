const express = require('express');
const router = express.Router();

const {
    create,
    getAll,
    deleteNewsLetter,
    getNewsLetterByType,
    getNewsLetterByIdPost,
    sendEmailToAllNewsLetterEmails,
    sendEmailToSpecificNiche,
    editNewsLetter
} = require('../controllers/newsletter.controller');
const { verifyTokenAdmin } = require('../config/middlware/auth');


router.post('/subscribe', create);
router.get('/all', verifyTokenAdmin , getAll);
router.delete('/delete/:id', verifyTokenAdmin , deleteNewsLetter);
router.put('/update/:id', verifyTokenAdmin , editNewsLetter);
router.get('/bytype/:type', verifyTokenAdmin , getNewsLetterByType);
router.get('/bypost/:idpost', verifyTokenAdmin , getNewsLetterByIdPost);
router.post('/sendemailtoallnewsletteremails', verifyTokenAdmin , sendEmailToAllNewsLetterEmails);
router.post('/sendemailtospecificniche/:idpost', verifyTokenAdmin , sendEmailToSpecificNiche);



module.exports = router;