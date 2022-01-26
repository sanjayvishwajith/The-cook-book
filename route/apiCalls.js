const express = require('express');
const Auth = require('../passport-config/auth.js');
const APICALLs = require('../controllers/reqestAPIFunc');



const router  = express.Router();



router.get('/apireq', Auth.ensureAuthenticate , async (req, res) => {


    await APICALLs.requestFoodCard(req.query)
    .then((data) => {
        
        // console.log( data );

        if (data == false) {
            res.json({
                "data": ""
            });
        }
        else {
            res.json({
                "data": data
            });
        }
        
    })
    .catch(err => {res.json({"data": ""});});


});











module.exports = router;