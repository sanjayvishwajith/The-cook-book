const CONFIG = require('../CONFIG.js');
const axios = require('axios');




module.exports = {

    requestFoodCard: async ({q, from, to, cuisineType}) => {

        var queryString="https://api.edamam.com/search?";
    
        if (q == "" || typeof(q) == "undefined") {
            queryString += `q=Indian`;
        }
        else {
            queryString += `q=${q}`;
        }
    
    
        queryString += `&app_id=${CONFIG.app_id}`;
        queryString += `&app_key=${CONFIG.app_key}`;
    
    
    
    
        if (!(from == "" || typeof(from) == "undefined")) {
            queryString += `&from=${from}`;
        }
    
        if (!(to == "" || typeof(to) == "undefined")) {
            queryString += `&to=${to}`;
        }
    
        if (!(cuisineType == "" || typeof(cuisineType) == "undefined")) {
            queryString += `&cuisineType=${cuisineType}`; 
        }
    
    
        

        // console.log( queryString );
    
        var result = null;

        
        await axios.get(queryString).then(res => {
            
            var jsonString = res.data;


            var reqJsonString = {

                "query": jsonString.q,
                "from": jsonString.from,
                "to": jsonString.to,
                "htmlString": ""
            };

            var hits = [];

            for (var i=0; i < jsonString.hits.length; i++) {

                var curntElem = {
                    "index": i,
                    "label": jsonString.hits[i].recipe.label,
                    "image": jsonString.hits[i].recipe.image,
                    "url": jsonString.hits[i].recipe.url,
                    "ingredients": [],
                    "dietLabels": jsonString.hits[i].recipe.dietLabels,
                    "cuisineType": jsonString.hits[i].recipe.cuisineType,
                    "mealType": jsonString.hits[i].recipe.mealType,
                    "dishType": jsonString.hits[i].recipe.dishType,
                    "totalNutrients": {
                        "ENERC_KCAL": {
                            "label": jsonString.hits[i].recipe.totalNutrients.ENERC_KCAL.label,
                            "quantity": parseFloat(jsonString.hits[i].recipe.totalNutrients.ENERC_KCAL.quantity).toFixed(2),
                            "unit": jsonString.hits[i].recipe.totalNutrients.ENERC_KCAL.unit
                        },
                        "FAT": {
                            "label": jsonString.hits[i].recipe.totalNutrients.FAT.label,
                            "quantity": parseFloat(jsonString.hits[i].recipe.totalNutrients.FAT.quantity).toFixed(2),
                            "unit": jsonString.hits[i].recipe.totalNutrients.FAT.unit
                        },
                    }
                };

                jsonString.hits[i].recipe.ingredients.forEach(
                    (inc) => {

                        curntElem["ingredients"].push({
                            "food": inc.food,
                            "quantity": inc.quantity,
                            "measure": (inc.measure == "<unit>")? "":inc.measure,
                        });
                        
                    }
                );

                

                hits.push(curntElem);
            }





            var ejs = require('ejs');
            var path = require('path');

            
            var templatePath = path.resolve(__dirname, '../views/partials/foodCard.ejs');
            var templateStr  = ejs.fileLoader(templatePath, 'utf8');
            var template     = ejs.compile(templateStr, {filename: templatePath});
            

            var processedData = ""

            hits.forEach(
                (dataElement) => {

                    var t = template(
                        {
                            "index": dataElement.index,
                            "label": dataElement.label,
                            "image": dataElement.image,
                            "url": dataElement.url,
                            "ingredients": dataElement.ingredients,
                            "dietLabels": dataElement.dietLabels,
                            "cuisineType": dataElement.cuisineType,
                            "mealType": dataElement.mealType,
                            "dishType": dataElement.dishType,
                            "totalNutrients": dataElement.totalNutrients,
                        }
                    )                                     
                    
                    processedData += t;
                }
            );




            reqJsonString.htmlString = processedData;


            result = reqJsonString;
        })
        .catch(err => { result = false; } );
    




        return result;
    }
    


}


// https://api.edamam.com/search?q=egg&app_id=30b96519&app_key=309a726464ec7e4544eca8bb8199be1f&more=true&from=50&to=110








