const express = require('express');
const Auth = require('../passport-config/auth.js');


const router  = express.Router();



router.get('/recipe', Auth.ensureAuthenticate ,(req, res) => {

    res.redirect('/home');

});





router.post('/recipe', Auth.ensureAuthenticate ,(req, res) => {

    console.log(req.body);

    res.render('recipe.ejs', {
        layout: false, 
        label: req.body.label,
        ingredients: req.body.ingredients,
        image: req.body.image,
        dietLabels: req.body.dietLabels,
        cuisineType: req.body.cuisineType,
        mealType: req.body.mealType,
        dishType: req.body.dishType,
        totalNutrients_ENERC_KCAL: req.body.totalNutrients_ENERC_KCAL,
        totalNutrients_FAT: req.body.totalNutrients_FAT,
    
    });



});







module.exports = router;