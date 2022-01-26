const express = require('express');
const app = express();
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const CONFIG = require('./CONFIG.js');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');


// passport config
require('./passport-config/passport-config.js')(passport);
app.set('view engine', 'ejs');
app.use(express.static("public"));





// DB
mongoose.Promise = global.Promise;
mongoose.connect( CONFIG.mongo_uri , {useNewUrlParser:true , useUnifiedTopology: true }  );
const db = mongoose.connection;

db.once('open', () => {
    console.log("::>> Connected to DB");
}).on('error', (err) => {
    console.log('::>> '+ err);
});

// Public Assests
app.use(express.static(path.join(__dirname, './views')));
app.use(express.static(path.join(__dirname, './assets/js')));
app.use(express.static(path.join(__dirname, './assets/css')));
app.use(express.static(path.join(__dirname, './assets/images')));
app.use(express.static(path.join(__dirname, './assets/fonts')));



// EJS
app.set('layout', 'layouts/layout');
app.use(expressLayout);



// Body-parser
app.use(express.urlencoded({extended : false}))




// Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))


// Flas

app.use(flash());

// Global vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');

    // Error for "failureFlash: true" in /login post passport authenticate
    res.locals.error = req.flash('error');

    // console.log( res.locals.success_msg );

    next();
});


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const api_route = require('./route/apiCalls.js');
app.use('/', api_route);


const home_route = require('./route/home.js');
app.use('/', home_route);

const search_route = require('./route/search.js');
app.use('/', search_route);

const recipe_route = require('./route/recipe.js');
app.use('/', recipe_route);

const users_route = require('./route/users.js');
app.use('/', users_route);

app.get('/logout', (req,res) =>{
  req.logOut()
  res.redirect('/login');
});



app.listen( process.env.PORT || 5000, () => {
    console.info("SERVER STARTED...");
});
