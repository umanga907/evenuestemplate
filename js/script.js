/**
 * @Script js for (Template/Project Name)
 *
 * @project     - Project Name
 * @author      - 
 * @created_by  - kawsar bin siraj
 * @created_at  - 
 * @modified_by -
 */


/**
 * ========================================================
 * this function execute when window properly loaded
 * ===========================================================
 */

//$(window).on('load', function () {

//    // code should be execute here

//});



/**
 * ========================================================
 * this function execute when DOM element ready 
 * ===========================================================
 */

$(document).ready(function () {

    if ($('#steps').length) {
        $('#steps').steps({
            onFinish: function () { alert('complete'); }
        });
    }

    //// $('.clone-body')
    //$(function () {
    //    if ($('.btn-clone').length && $('.clone-body').length) {
    //        $(document).on('click', '.btn-clone', function (event) {
    //            event.preventDefault();
    //            var $clone = $(this).closest('.clone-data').clone(true);
    //            var $newButtons = `
    //                        <button type="button" class="btn btn-add btn-remove">
    //                            <i class="ni ni-minus"></i>
    //                        </button>`;
    //            $clone.find('.btn-clone-group').html($newButtons).end().appendTo($(this).closest('.clone-data').parent().find('.clone-body'));
    //        });
    //        $(document).on('click', '.btn-remove', function (event) {
    //            event.preventDefault();
    //            $(this).closest('.clone-data').remove();
    //        });
    //    }
    //});

});

/**
 * ========================================================
 * this function execute when ste-4-popup
 * ===========================================================
 */

 //$(document).ready(function(){
 //   $('.popup-weekday').click(function(){
 //         $(this).children(".popup-add-weekday").fadeToggle(500); 
 //   });
 //});

 /**
 * ========================================================
 * this function execute when ste-4-popup
 * ===========================================================
 */

// $(document).ready(function() {
//$(".subscribe-button-active").click(function () {
//    $(".subscribe-button-active").removeClass("active");
//    $(this).addClass("active");        
//});
//});

 /**
 * ========================================================
 * this function execute when DOM element ready add img
 * ===========================================================
 */

//$(document).ready(function () {

//    $(document).on('click', '.add-more-photos', function (event) {
//        event.preventDefault();
//        var $addimg = `                             <div class="img-close"        
//                                                    <label for="#" class="form-label">New photo</label>
//                                                    <label class="file-formate-2 border rounded d-flex align-items-center justify-content-between overflow-hidden me-3"
//                                                        for="file-2">
//                                                        <input class="d-none" type="file" name="#" id="file-2">
//                                                        <p class="mb-0 ps-3">Choose file</p>
//                                                        <span class="file-icon bg-theme-main-color px-2 py-2">
//                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                                                <path
//                                                                    d="M20.8744 8.00773L9.69368 19.0643C7.84111 20.8965 4.83721 20.8965 2.98464 19.0643C1.13207 17.2322 1.13207 14.2621 2.98464 12.4299L13.0478 2.47907C14.2831 1.25787 16.2849 1.25787 17.5203 2.47907C18.7556 3.70023 18.7556 5.68085 17.5203 6.90201L7.45707 16.8529C6.83981 17.4639 5.83851 17.4639 5.22046 16.8529C4.6032 16.2427 4.6032 15.2524 5.22046 14.6414L14.1654 5.79626L13.047 4.69054L4.10296 13.5364C2.86765 14.7576 2.86765 16.7382 4.10296 17.9594C5.33828 19.1806 7.34008 19.1806 8.57539 17.9594L18.6386 8.00852C20.4912 6.17638 20.4912 3.20628 18.6386 1.3741C16.786 -0.458035 13.7821 -0.458035 11.9296 1.3741L1.30719 11.8778L1.34569 11.9163C-0.583871 14.3696 -0.414241 17.9162 1.86636 20.1708C4.14695 22.4255 7.73195 22.5943 10.2136 20.6852L10.2521 20.7237L21.9919 9.11424L20.8744 8.00773Z"
//                                                                    fill="white"></path>
//                                                            </svg>
//                                                        </span>
//                                                    </label>
//                                                    </div>
//        `;
//        var $addremovebutton='<a href="" class="add-more-photos me-3">Add more photoa</a><a href="" style="#FF0000" class="remove-more-photos">Remove photoa</a>'
//        $('.img-body-1').html($addimg).end().appendTo($(this).closest('.img-body-1').parent().find('.img-body-1'));
//        $('.img-button-grup').html($addremovebutton).end();
//    });
//    $(document).on('click', '.remove-more-photos', function (event) {
//                event.preventDefault();
//                $('.img-close').remove();
//            });

//});



/**
 * ========================================================
 * this function execute when DOM element ready 
 * ===========================================================
 */

//$(document).ready(function () {

    //if ($('#steps').length) {
    //    $('#steps').steps({
    //        onFinish: function () { alert('complete'); }
    //    });
    //}

 //   // $('.clone-body')
 //   $(function () {
 //       if ($('.img-btn-clone').length && $('.img-clone-body').length) {
 //           $(document).on('click', '.img-btn-clone', function (event) {
 //               event.preventDefault();
 //               var $clone = $(this).closest('.add-img-data').clone(true);
 //               var $newButtons1 = `
 //                           <button type="button" class="btn btn-add btn-remove">
 //                               <i class="ni ni-minus"></i>
 //                           </button>`;
 //               $clone.find('.img-btn-clone-group1').html($newButtons1).end().appendTo($(this).closest('.add-img-data').parent().find('.img-clone-body'));
 //               $clone.find('.name-chang-external').text('New photo').end().appendTo($(this).closest('.add-img-data').parent().find('.img-clone-body'));
 //           });
 //           $(document).on('click', '.btn-remove', function (event) {
 //               event.preventDefault();
 //               $(this).closest('.add-img-data').remove();
 //           });
 //       }
 //   });
	
	
	//$('.parking-radio input[type="radio"]').on('change', function(){
	//	if($(this).attr('id') == 'radio-2') {
	//		$('.additional-changes-wrap').show();
	//	} else {
	//		$('.additional-changes-wrap').hide();
	//	}
	//});

//});