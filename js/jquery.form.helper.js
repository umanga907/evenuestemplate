$(document).ready(function () {
    InitializeDatePickers();
    InitializeAutoComplete();
    InitializeAjaxForms();
    //$('.phone').mask("(000) 000-0000", { placeholder: "(___) ___-____" });
});

var _currentForm = null;
var _datePickerFormat = "MM/DD/YYYY";

var _ajaxFormDefaultSettings = {
    beforeSubmit: validateForm,
    success: onFormSaveSuccess 
};

function onSubmitForm() {
    _currentForm = $('.ajax-based-form');
    $(_currentForm).ajaxSubmit(_ajaxFormDefaultSettings);
}

function InitializeDatePickers() {
    if (classExists("date")) {
        $(".date").datetimepicker({
            format: _datePickerFormat,
            maxDate: moment()
        });
    }
    if (classExists("date-time")) {
        $(".date-time").datetimepicker({
            format: _dateTimeFormat,
            maxDate: moment()
        });
    }
}

function InitializeAutoComplete() {
    if (!classExists("auto-complete")) { return; }
    $('.auto-complete').typeahead({
        items: 10,
        minLength: 1,
        delay: 1,
        //// default template
        //menu: '<ul class="typeahead dropdown-menu-right" role="listbox"></ul>',
        //item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
        //headerHtml: '<li class="dropdown-header"></li>',
        //headerDivider: '<li class="divider" role="separator"></li>'
        //itemContentSelector: 'a',
        displayText: function (item) {
            return item.Text
        },
        afterSelect: function (item) {
            var aftSelect = $(this.$element[0]).attr('data-after-select');
            if (typeof (aftSelect) != 'undefined' && aftSelect !== null && aftSelect !== "") {
                if (aftSelect.selector != "#undefined") {
                    executeFunctionByName(aftSelect.selector.replace('#', ''));
                }
            }
        },
        source: function (query, process) {
            var url = $(this.$element[0]).attr('data-url');
            if (typeof (url) == 'undefined' || url == null) {
                alert('Please specify the data-url');
                return;
            }
            var parent = $(this.$element[0]).attr('data-parent-field');
            var parentVal = '';
            if (typeof (parent) != 'undefined' && parent !== null) {
                if (parent.length > 0) {
                    parentVal = $("#" + parent).val();
                }
            }
            return $.getJSON(url, { v: query, parent: parentVal }, function (data) {
                process(data)
            })
        },
        updater: function (item) {
            var idField = $(this.$element[0]).attr('data-id-field');
            if (typeof (idField) != 'undefined' && idField !== null && idField !== "") {
                $("#" + idField).val(item.Value);
            }
            return item.Text;
        }
    });
}

function InitializeAjaxForms() {
    var form = $('.ajax-based-form');
    if (form.length == 0) { return; }
    var beforeSubmitMethod = form.data('before-submit-method');
    if (!$.isEmptyObject(beforeSubmitMethod)) {
        _ajaxFormDefaultSettings.beforeSubmit = window[beforeSubmitMethod];
    }
    var afterSubmitMethod = form.data('after-submit-method');
    if (!$.isEmptyObject(afterSubmitMethod)) {
        _ajaxFormDefaultSettings.success = window[afterSubmitMethod];
    }
    form.ajaxForm(_ajaxFormDefaultSettings);
}

function validateForm(formData, jqForm, options) {
    var form = jqForm[0];
    var valid = $(form).validate().form();
    if (valid == false) {
        HideProgress();
    }
    return valid;
}

function HandleValidationError(xhr) {
    var errorList = "";
    var errorCount = 0;
    var _currentForm = $('.ajax-based-form');
    $(_currentForm).find("input").removeClass('input-validation-error');
    $.each(xhr.responseJSON, function (i, item) {
        var $val, $input;
        if (item.Name) {
            $input = $(_currentForm).find("*[name='" + item.Name + "']");
            if (!$input.is(":hidden")) {
                errorCount++;
                $input.addClass("input-validation-error");
                $val = $(_currentForm).find("[data-valmsg-for='" + item.Name + "']");
                $val.removeClass("field-validation-valid")
                $val.addClass("field-validation-error");
                $val.text(item.Message);
                if (errorCount == 1) {
                    $input.focus();
                }
            }
        } else {
            errorList += "<li>" + item.Message + "</li>";
        }
    });
    if (errorList == "") {
        errorList = "Please provide the required information.";
    } else {
        errorList = "Please provide the required information.<ul>" + errorList + "</ul>";
    }
    return errorList;

}
function onFormSaveSuccess(responseText, statusText, xhr, $form) {
    if (xhr.status == "200") {
        var alert = CreateMessageBox(_sucessMessage, "Success");
        $(alert).prependTo($form).show('slow');
        var idhidden = $form.find("#" + $form.attr('data-key-field')).filter(":hidden");
        if (responseText != null) {
            var responseKeyField = $form.attr('data-response-key-field')
            idhidden.val(responseText[responseKeyField]);
        }
        $($form).closest('.modal').modal('hide');
        var navigateUrl = $form.attr('data-navigate-success-url');
        if (navigateUrl != null || navigateUrl != undefined) {
            setTimeout(function () {
                window.location.href = navigateUrl;
            }, 1000);
            
        }
        return true;
    }
}

function executeFunctionByName(functionName, params) {
    var fn = window[functionName];
    if (typeof fn === "function") {
        if (params == null) {
            fn();
        } else {
            fn.apply(null, params);
        }
    }
}

function validateZipCode(zipControl, errorLabel, cityControl, staeControl, countryControl) {
    var zipCode = $("#" + zipControl).val();
    $.ajax({
        url: "https://api.zippopotam.us/us/" + zipCode,
        cache: false,
        dataType: "json",
        type: "GET",
        beforeSend: function (xhr) {
            $("#" + errorLabel).hide();
        },
        success: function (result, success) {
            // US Zip Code Records Officially Map to only 1 Primary Location
            places = result['places'][0];
            var countryCode = result['country abbreviation'];
            if (!(cityControl == undefined || cityControl == null)) {
                $("#" + cityControl).val(places['place name']);
            }
            if (!(staeControl == undefined || staeControl == null)) {
                $("#" + staeControl).val(places['state abbreviation']);
            }
            if (!(countryControl == undefined || countryControl == null)) {
                $("#" + countryControl).val(countryCode);
            }
        },
        error: function (result, success) {
            $("#" + errorLabel).text("Please enter a valid Zip Code");
            $("#" + errorLabel).addClass("field-validation-error");
            $("#" + errorLabel).show();
        }
    });
}