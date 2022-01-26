const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const user_model = require('../models/user_model.js');








router.get('/login', (req, res) => {
    res.render('login.ejs');
});



router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true,
}));


router.post('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/login');
});






router.get('/', (req, res) => {
    res.render('register.ejs');
});

router.post('/register', (req, res) => {

    let {email, password} = req.body;
    let errors=[];


    if (!email || !password) {
        errors.push("Please fill all the fields!");
    }



    if (errors.length > 0) {

        res.render('register', {
            errors,
            email
        });

    }
    else {

        user_model.findOne({email: email})
        .then(async (data) => {


            if (data) {
                errors.push("User already Exists with this email...");

                res.render('register', {
                    errors,
                    email
                });
            }
            else {


                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {

                        if (err) throw err;

                        const new_user = new user_model({
                            email: email,
                            password: hash,
                        });



                        new_user.save()
                        .then((data) => {
                            req.flash("success_msg", 'You are now registered!');
                            res.redirect("/login");
                        })
                        .catch(err => {
                            req.flash("error_msg", 'You are not registered!');
                            console.error(err);
                        })

                    });
                });



            }


        });





    }


});







module.exports = router;
