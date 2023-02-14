//Image Resize
var bScreen, imageResize, screenWidth;
bScreen = function() {
    var getHeight = $('.venue-type__col').width();
    $('.venue-type__col').height(getHeight - 50);
}

imageResize = function() {
    bScreen();
}

$(window).on('resize', function() {
    screenWidth = $(window).width();
    imageResize();
});

$(document).ready(function() {
    //Image Resige Function
    imageResize();

    //Custom Check for star rating
    $('.custom-checkbox > .form-check-input').change(function() {
        if ($(this).is(":checked")) {
            $(this).parent().addClass('is-checked');
        } else {
            $(this).parent().removeClass('is-checked');
        }
    });

    //Mobile Menu Toggle 
    $('#mobile-filter-open').on('click', function() {
        $("#card-filter").addClass('mobile-open');
    });
    $('#mobile-filter-close').on('click', function() {
        $("#card-filter").removeClass('mobile-open');
    });

});