const express = require('express');
const Auth = require('../passport-config/auth.js');


const router  = express.Router();



router.get('/search', Auth.ensureAuthenticate ,(req, res) => {
    res.render('search.ejs');
});











module.exports = router;