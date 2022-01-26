
module.exports = {
    ensureAuthenticate: (req, res, next) => {

        if (req.isAuthenticated() == true) {
            next();
        }
        else {
            req.flash('error_msg', 'Please login first');
            res.redirect('/login');
        }

    }
}
