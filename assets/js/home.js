

var isAlreadyCalledOnce = false;

async function getFoodCards() {
    
    isAlreadyCalledOnce = true;

    await $('div.content-page').append(`
        <div class="loader"></div>
    `);



    await $.ajax({
        type: "GET",
        url: "/apireq",
        data: {
            from: $('div.content-page div.foodview > *').length
        },
        success: function (response) {
            
            // console.log( response );

            console.log( response.data.query );

            if (response.data.htmlString == '') {
                // console.log("--", response.data.htmlString);
                $('div.content-page').append(`
                    <div id="no-more-results"> No More Results </div>
                `);
            }
            else {
                $('div.content-page div.foodview').append(response.data.htmlString);
            } 
                
        }
    });



    



    $('div.loader').remove();



    isAlreadyCalledOnce = false;
}





$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

// init food cards GET

if ($("div.footer").isInViewport()) {
    if ((isAlreadyCalledOnce == false) && ($("div#no-more-results").length == 0)) {
        getFoodCards();
    }
    // console.log("kkkkkkkkk");
}



$(window).on('resize scroll', function() {
    if ($('div#see-more').isInViewport()) {
        // console.log("visible");

        if ((isAlreadyCalledOnce == false) && ($("div#no-more-results").length == 0)) {
            getFoodCards();
        }

    } else {
        // console.log("not visible");
    }
});












$('div.content-page div.foodview').on('click', "div.foodlist" , (e) => {






    var dataQuery = {
        
        "label": $(e.currentTarget).find('a.card-link div.card div.card-body div.row div.col h4.dish-name').html(),
        "image": $(e.currentTarget).find('a.card-link div.card img.card-img-top').attr("src"), 
        "index": $(e.currentTarget).find('a.card-link div#info div#index').html(),
        "url": $(e.currentTarget).find('a.card-link div#info div#url').html(),
        "ingredients": $(e.currentTarget).find('a.card-link div#info ul#ingredients').html(),
        "dietLabels": $(e.currentTarget).find('a.card-link div#info ul#dietLabels').html(),
        "cuisineType": $(e.currentTarget).find('a.card-link div#info ul#cuisineType').html(),
        "mealType": $(e.currentTarget).find('a.card-link div#info ul#mealType').html(),
        "dishType": $(e.currentTarget).find('a.card-link div#info ul#dishType').html(),
        "totalNutrients_ENERC_KCAL": $(e.currentTarget).find('a.card-link div#info div#totalNutrients div#ENERC_KCAL').html(),
        "totalNutrients_FAT": $(e.currentTarget).find('a.card-link div#info div#totalNutrients div#FAT').html(),
    
    }


    var formTag = document.createElement("form");
    $(formTag).attr("action", "/recipe");
    $(formTag).attr("method", "POST");

    $(formTag).append(`
            
        <input type='text' name='${'label'}' value='${ dataQuery["label"] }'>
        <input type='text' name='${'image'}' value='${ dataQuery["image"] }'>
        <input type='text' name='${'index'}' value='${ dataQuery["index"] }'>
        <input type='text' name='${'url'}' value='${ dataQuery["url"] }'>
        <input type='text' name='${'ingredients'}' value='${ dataQuery["ingredients"] }'>
        <input type='text' name='${'dietLabels'}' value='${ dataQuery["dietLabels"] }'>
        <input type='text' name='${'cuisineType'}' value='${ dataQuery["cuisineType"] }'>
        <input type='text' name='${'mealType'}' value='${ dataQuery["mealType"] }'>
        <input type='text' name='${'dishType'}' value='${ dataQuery["dishType"] }'>
        <input type='text' name='${'totalNutrients_ENERC_KCAL'}' value='${ dataQuery["totalNutrients_ENERC_KCAL"] }'>
        <input type='text' name='${'totalNutrients_FAT'}' value='${ dataQuery["totalNutrients_FAT"] }'>

            
    `);

    console.log( $(formTag) );

    $(formTag).appendTo('body').submit();



});












