const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const user_model = require('../models/user_model.js');

module.exports = (passport) => {

    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {

            user_model.findOne({
                email: email,
            })
            .then((data) => {

                if (!data) {
                    return done(null, false, {message: 'That email is not registered'});
                }


                bcrypt.compare(password, data.password, (err, isMatch) => {
                    if (err) throw err;


                    if (isMatch == true)
                        return done(null, data);
                    else
                        return done(null, false, {message: 'Password incorrect'});
                });



            })
            .catch((err) => {
                console.error("::> "+err);

                return done(null, false, {message: 'Database Error'});
            });


        })
    );


    passport.serializeUser((user, done) => {
        done(null, user.email);
    });


    passport.deserializeUser((userId, done) => {
        user_model.findOne({email: userId})
        .then((data, err) => {
            done(err, data);
        });
    });




}
