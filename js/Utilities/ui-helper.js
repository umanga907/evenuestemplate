var _dateFormat = "M/DD/YYYY";
//var _baseUrl = window.location.protocol + "//" + window.location.host;//.origin;
var _sucessMessage = "The record saved successfully!";
var _unAuthorized401MessageTitle = "Unauthorized";
var _unAuthorized401Message = "Sorry, you are not authorized to view the request page. Please contact administrator.";
var _sessionExpiry403MessageTitle = "Forbidden";
var _sessionExpiry403Message = "Sorry, your session has expired. Please login again to continue.";
var _sessionExpiry404MessageTitle = "Not Found";
var _sessionExpiry404Message = "Sorry, the requested file or folder is not found.";
var _sessionExpiry500MessageTitle = "Internal Server Error";
var _sessionExpiry500Message = "We encountered an error while processing your request. We apologies for inconvenience. Please reload the page and try again.<br/>If you continue to encounter this error contact our <a href='mailto:gurubn@hitforward.in?subject=Error:{CORRELATION_ID}&body=Hi,We got an error while acessing your website.'>customer support</a> by mentioning the ID: {CORRELATION_ID}<br/><br/><strong>Error Message:</strong>{ERROR_MESSAGE}";
var _antiforgeryTokenHeaderName = "X-TOKEN-ANTIFORGERY";
var _antiForgeryToken = "";
var _loadingIndicatorElementName = "loading-indicator";
var _loadingIndicatorDelay = 4000;
var _showLoadingIndicator = false;
var _loadingIndicatortimeOutRef;
var _userRole = "";
var _currentForm = null;


function InitializeJQueryAjax() {
    HideProgress();
    $.ajaxSetup({
        beforeSend: function (xhr) {
            debugger;
            $('#ServerMessage').hide();
            xhr.setRequestHeader(_antiforgeryTokenHeaderName, _antiForgeryToken);
        },
        error: function (xhr) {
            alert(xhr.responseText);
            HideProgress();
            HandleServerError(xhr);
        }
    });

    $(document).ajaxStart(function () {
        _showLoadingIndicator = true;
        _loadingIndicatortimeOutRef = setTimeout("ShowProgress()", _loadingIndicatorDelay);
    });

    $(document).ajaxStop(function () {
        HideProgress();
    });
}

function ShowProgress() {
    if (_showLoadingIndicator) {
        $("#" + _loadingIndicatorElementName).show();
    }
}

function HideProgress() {
    _showLoadingIndicator = false;
    $("#" + _loadingIndicatorElementName).hide();
    clearTimeout(_loadingIndicatortimeOutRef);
}

function classExists(className) {
    if ($('.' + className)[0]) {
        return true;
    }
    return false;
}

function HandleServerError(xhr) {
    var errorMessageTitle = _sessionExpiry500MessageTitle;
    var errorMessage = _sessionExpiry500Message;
    var type = "Warning";
    if (xhr.status == 400 || xhr.status == 422)//Bad Request/Unprocessable Entity
    {
        type = "Warning";
        errorMessageTitle = "Validation Error!";
        errorMessage = HandleValidationError(xhr);
    } else if (xhr.status == 401) {
        type = "Warning";
        errorMessageTitle = _unAuthorized401MessageTitle;
        errorMessage = _unAuthorized401Message;
    } else if (xhr.status == 403) {
        type = "Warning";
        alert(message);
        window.location.href = _loginUrl;
        return;
    } else if (xhr.status == 404) {
        type = "Warning";
        errorMessageTitle = _sessionExpiry404MessageTitle;
        errorMessage = _sessionExpiry404Message;
    } else if (xhr.status == 500) {
        type = "Error";
        errorMessageTitle = _sessionExpiry500MessageTitle;
        try {
            var error = JSON.parse(xhr.responseText);
            errorMessage = _sessionExpiry500Message.replace(/{ERROR_MESSAGE}/gi, error.Message);
            errorMessage = errorMessage.replace(/{CORRELATION_ID}/gi, error.CorelationId);
            errorMessage += error.Stack;
        } catch {
            errorMessage = _sessionExpiry500Message.replace(/{ERROR_MESSAGE}/gi, xhr.responseText);
            errorMessage = errorMessage.replace(/{CORRELATION_ID}/gi, xhr.responseText);
            errorMessage += xhr.responseText;
        }
    }
    else {
        type = "Error";
        errorMessage = xhr.status + ": " + xhr.statusText;
    }
    var alert = CreateMessageBox(errorMessage, type);
    if (_currentForm == null) {
        _currentForm = $('.ajax-based-form');
    }
    $(alert).prependTo(_currentForm).show();
}

function CreateMessageBox(message, type) {
    $('#ServerMessage').remove();
    var alertStyle = "alert alert-warning";
    var icon = "fas fa-exclamation-triangle";
    if (type == "Error") {
        alertStyle = "alert alert-danger";
        icon = "fas fa-times";
    } else if (type == "Success") {
        alertStyle = "alert alert-success";
        icon = "fa fa-check";
    } else if (type == "Warning") {
        alertStyle = "alert alert-warning";
        icon = "fa fa-exclamation-triangle";
    }
    alertStyle = alertStyle + " alert-dismissible fade show";
    var alert = "<div id=\"ServerMessage\" class=\"" + alertStyle + "\" role=\"alert\"><button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"alert\"></button>" + message + "</div>";
    //var alert = "<div id=\"ServerMessage\" class=\"" + alertStyle + "\" role=\"alert\"><i class=\"" + icon + "\" aria-hidden=\"true\"></i>" + message + "<i class=\"fa fa-times close\" data-dismiss=\"alert\" aria-hidden=\"true\" onclick=\"CloseMessageBox()\"></i></div >";
    return alert;
}

function CloseMessageBox() {
    $("div#ServerMessage").hide();
}

function InitializeCroppie(croppieImageName, fileInputName, targetImageControlName, width, height) {
    $image_crop = $('#' + croppieImageName).croppie({
        enableExif: true,
        viewport: {
            width: width,
            height: height,
            type: 'circle'
        },
        boundary: {
            width: width,
            height: height
        },
        update: function (croppie) {
            $image_crop.croppie('result', { type: 'canvas' }).then(function (response) {
                $('#' + targetImageControlName).val(response);
            });
        }
    });
    $('#' + fileInputName).on('change', function () {
        var reader = new FileReader();
        reader.onload = function (e) {
            $image_crop.croppie('bind', {
                url: e.target.result
            });
        }
        reader.readAsDataURL(this.files[0]);
    });
}

function MakeReadOnlyForm() {
    $('input[type="text"],input[type="checkbox"],input[type="radio"], textarea,select').attr('disabled', true);
    $('input[type="text"],input[type="checkbox"],input[type="radio"], textarea,select').attr('background-color', 'ffffff!important');
    $('input[type="checkbox"]').prop('disabled', 'disabled');
}

function initGoogleAddressAutocomplete() {
    if (classExists("google-address-autocomplete")) {
        var locationControls = document.getElementsByClassName('google-address-autocomplete');
        for (var i = 0; i < locationControls.length; i++) {
            makeGoogleAddressAutocomplete(locationControls[i]);
        }
    }
}

function makeGoogleAddressAutocomplete(input) {
    var id = $(input).attr('id');
    var autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById(id)), {
            types: ['geocode'],
            componentRestrictions: { country: ["usa"] },
            //fields: ['address_component']
            fields: ['address_component', 'geometry']
    });
    var aftSelect = $(input).attr('data-after-select');
    if (typeof (aftSelect) != 'undefined' && aftSelect !== null) {
        if (aftSelect.selector != "#undefined") {
            autocomplete.addListener('place_changed', function (position) {
                var place = autocomplete.getPlace();
                window[aftSelect](id, place);
            });
        }
    }
}

function facebook() {
    var url = location.href;
    var title = document.title;
    window.open('https://www.facebook.com/sharer.php?u=' + encodeURIComponent(url) + '&t=' + encodeURIComponent(title), 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}

function tweet() {
    var url = location.href;
    var title = document.title;
    window.open('https://twitter.com/share?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title) + "&via=eVenues", 'sharer', 'toolbar=0,status=0,width=626,height=436');
    return false;
}