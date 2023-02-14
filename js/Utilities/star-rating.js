$(document).ready(function () {
    $(".star-rating-description").text('');
    $(".material-icons").on("mouseenter", function () {
        $(".star-rating-description").text($(this).parent().attr('title'));
    });
    $(".material-icons").on("mouseleave", function () {
        if ($(this).parent().parent().filter(":checked") == false) {
            $(".star-rating-description").text('');
        }
    });

});