$(document).ready(function () {
    initGoogleAddressAutocomplete();
    showCarousel();
});

function searchVenue() {
    var url = _baseUrl + "/Index?handler=Search";
    $.ajax({
        url: url,
        type: "POST",
        data: $(document.forms["SearchForm"]).serialize(),
        success: function (result) {
            if (result == "OK") {
                var meetingCity = $("#SearchRequestView_MeetingCity").val();
                var meetingDate = $("#SearchRequestView_MeetingDate").val();
                var meetingCategories = $("#SearchRequestView_MeetingCategory").val();
                var meetingCapacity = $("#SearchRequestView_MeetingCapacity").val();
                window.location.href = _baseUrl + "/meeting-spaces/?city=" + meetingCity + "&capacity=" + meetingCapacity + "&date=" + meetingDate + "&category=" + meetingCategories;
            } else {
                var alert = CreateMessageBox(result, "Error");
                $(alert).prependTo("#SearchForm").show();
            }
        }
    });
}

function sendTellUsMoreMessage() {
    var url = _baseUrl + "/Index?handler=TellUsMore";
    $.ajax({
        url: url,
        type: "POST",
        data: $(document.forms["TellUsMoreForm"]).serialize(),
        success: function (result) {
            if (result == "OK") {
                document.forms["TellUsMoreForm"].reset();
                var alert = CreateMessageBox("The message sent successfully!", "Success");
                $(alert).prependTo("#TellUsMoreForm").show();
            } else {
                var alert = CreateMessageBox(result, "Error");
                $(alert).prependTo("#TellUsMoreForm").show();
            }
        }
    });
    return false;
}

function stayConnectedMessage() {
    var url = _baseUrl + "/Index?handler=StayConnected";
    $.ajax({
        url: url,
        type: "POST",
        data: $(document.forms["StayConnectedForm"]).serialize(),
        success: function (result) {
            if (result == "OK") {
                document.forms["StayConnectedForm"].reset();
                var alert = CreateMessageBox("Your registration is successful", "Success");
                $(alert).prependTo("#StayConnectedForm").show();
            } else {
                var alert = CreateMessageBox(result, "Error");
                $(alert).prependTo("#StayConnectedForm").show();
            }
        }
    });
    return false;
}

function showCarousel() {
    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            768: {
                items: 2
            },
            1024: {
                items: 3
            },
            1199: {
                items: 3
            },
            1366: {
                items: 4
            }
        }
    })
}