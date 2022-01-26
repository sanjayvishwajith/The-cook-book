const express = require('express');
const Auth = require('../passport-config/auth.js');
const APICALLs = require('../controllers/reqestAPIFunc');



const router  = express.Router();



router.get('/home', Auth.ensureAuthenticate , async (req, res) => {


    // await APICALLs.requestFoodCard({q: "egg", from: 10, to: 20, cuisineType: "Indian"})
    // .then((data) => {
    //     console.log( "result = " + data );
    // });


    

    res.render('home.ejs');
});











module.exports = router;