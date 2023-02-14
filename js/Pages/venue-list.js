////var _dataTable = null;
////var _neighborhood = "Any|Any";
//////var searchTextTimer;
//////var searchTextTimeout = 1000;

////$(document).ready(function () {
////    initGoogleAddressAutocomplete();
////    searchVenue();
////});

////function searchByVenueName() {
////    alert("Please enter Venue Name");
////    //if ($('#Search_PropertyName').val() === null) {
////    //        alert("Please enter Venue Name");
////    //}
////}

////function searchVenue() {
////    if ($("#Search_MeetingCity").val() == "") {
////        var alert = CreateMessageBox("Meeting City or Address or Zip is required", "Error");
////        $(alert).prependTo("#SearchPanel").show();
////        destroyGrid();
////        return;
////    }
////    destroyGrid();
////    $("#Search_Sort").val($("input[name='Sort']:checked").val());
////    $("#Search_Guest").val($("input[name='Guest']:checked").val());
////    $("#Search_PriceRange").val($("input[name='PriceRange']:checked").val());
////    $("#Search_Amenities").val($("input[name='Amenity']:checked").val());
////    $("#Search_Neighborhood").val($("input[name='Neighborhood']:checked").val());
////    $("#Search_PropertyType").val($("input[name='PropertyType']:checked").val());
////    $("#Search_PropertyClass").val($("input[name='PropertyClass']:checked").val());
////    $("#Search_GuestRating").val($("input[name='GuestRating']:checked").val());
////    var searchFields = ["Search_MeetingCity", "Search_MeetingDate", "Search_MeetingCategory", "Search_MeetingCapacity", "Search_Sort", "Search_PropertyName", "Search_Guest", "Search_PriceRange", "Search_Amenities", "Search_Neighborhood", "Search_PropertyType", "Search_PropertyClass","Search_GuestRating"];
////    var searchUrl = _baseUrl + "/meeting-spaces?handler=Search";
////    _gridDomModel = "<'row'<'col-sm-6'i><'col-sm-6'p>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>";
////    _pageLength = 25;
////    //_infoText = "Showing _START_ to _END_ of _TOTAL_ venues";
////    _infoText = "_TOTAL_ results found matching your search";
    
////    _infoEmptyText = "No Venues found";
////    var columns = [
////        { "title": "SpaceId", "data": "SpaceId", "defaultContent": "", "width": "20", "render": function (data, type, row, meta) { return formatColumn(data, type, row, meta) } },
////    ];
////    _dataTable = CreateDataTablesGrid("dataGrid", columns, searchUrl, searchFields, null, false, null, null, null, "getNearbyCities");
////}

////function getNearbyCities(json) {
////    setMarkers(json);
////    var url = _baseUrl + "/meeting-spaces?handler=NearbyCities&lat=" + json.additionalResult.Latitude + "&lon=" + json.additionalResult.Longitude;
////    $.ajax({
////        url: url,
////        type: "GET",
////        success: function (dictionary) {
////            var checked = "";
////            if (_neighborhood == "Any|Any") {
////                checked = "checked=\"checked\"";
////            }
////            var result = "<div class=\"form-check\"><label class=\"form-check-label\"><input class=\"form-check-input\" id=\"Neighborhood\" name=\"Neighborhood\" type=\"radio\" value=\"Any|Any\" onclick=\"searchVenue();\"" + checked +" />Any<span class=\"form-check-sign\"><span class=\"check\"></span></span></label></div>";
////            for (var key in dictionary) {
////                if (dictionary.hasOwnProperty(key)) {
////                    checked = "Any|Any";
////                    var selectedKey = key + "|" + dictionary[key];
////                    if (_neighborhood != "Any|Any") {
////                        if (selectedKey == _neighborhood) {
////                            checked = "checked=\"checked\"";
////                        }
////                    }
////                    result += "<div class=\"form-check\"><label class=\"form-check-label\"><input class=\"form-check-input\" id=\"Neighborhood\" name=\"Neighborhood\" type=\"radio\" value=\"" + key + "|" + dictionary[key] + "\" onclick=\"searchByNearybuVenue();\"" + checked +" />" + key + "<span class=\"form-check-sign\"><span class=\"check\"></span></span></label></div>";
////                }
////            }
////            $("#Neighborhood_card_body").html(result);
////        }
////    });
    
////}

////function searchByNearybuVenue() {
////    _neighborhood = $("input[name='Neighborhood']:checked").val()
////    searchVenue();
////}

////function formatColumn(data, type, row, meta) {
////    //var col1 = "<div class=\"search-card shadow\"><div class=\"search-card__number\">" + row.RowId + "</div><div class=\"search-card__image\"><img class=\"card-img-top\" src=\"" + _baseUrl + "/Image/" + row.ThumbnailId + "\" alt=\"" + data.RoomName + "\"><div class=\"search-card__compare\"><div class=\"form-check small\"><label class=\"form-check-label\"><input class=\"form-check-input\" type=\"checkbox\" value=\"\">Compare<span class=\"form-check-sign\"><span class=\"check\"></span></span></label></div></div></div>";
////    var col1 = "<div class=\"search-card shadow\"><div class=\"search-card__number\">" + row.RowId + "</div><div class=\"search-card__image\"><img class=\"card-img-top\" src=\"" + _baseUrl + "/Image/" + row.ThumbnailId + "\" alt=\"" + data.RoomName + "\"></div>";
////    var review = "";
////    if (row.Reviews > 0) {
////        if (row.AverageRating >= 1) {
////            review += "<i class=\"material-icons small\">star</i>";
////        }
////        if (row.AverageRating >= 2) {
////            review += "<i class=\"material-icons small\">star</i>";
////        }
////        if (row.AverageRating >= 3) {
////            review += "<i class=\"material-icons small\">star</i>";
////        }
////        if (row.AverageRating >= 4) {
////            review += "<i class=\"material-icons small\">star</i>";
////        }
////        if (row.AverageRating == 5) {
////            review += "<i class=\"material-icons small\">star</i>";
////        }
////        review = "<div class=\"search-card__review text-dark\"><div class=\"search-card__rating\">" + review + "</div><div class=\"search-card__numreviews\"> <span class=\"bold\">" + row.AverageRating + "/5</span><span class=\"text-dark\" href=\"#\"> (" + row.Reviews + " reviews) </span></div></div>";
////    }
////    var wify = "";
////    if (row.WiFi) {
////        wify = "<i class=\"material-icons\" title=\"Wireless Available\">wifi</i></li>"
////    }
////    var smoking = "";
////    if (row.SmokingAllowed) {
////        smoking = "<i class=\"material-icons\" title=\"Smoking Allowed\">create</i></li>"
////    }
////    var catering = "";
////    if (row.InHouseCatering) {
////        catering = "<i class=\"material-icons\" title=\"Catering available\">local_dining</i></li>"
////    }
////    var adaAccessible = "";
////    if (row.ADAAccessible) {
////        adaAccessible = "<li><i class=\"material-icons\" title=\"Accessible\">accessible</i></li>"
////    }

////    var hourlyRental = "<b>NO</b> hourly rental";
////    if (row.HourlyRate > 0) {
////        hourlyRental = "$" + row.HourlyRate + "/hr";
////    }

////    var dailyRental = "<b>NO</b> daily rental";
////    if (row.DailyRate > 0) {
////        dailyRental = "$" + row.DailyRate + "/day";
////    }
////    //<li>" + row.WeekendRate + "/weekend</li>
////    var col2 = "<div class=\"search-card__info\"><div class=\"search-card__leftinfo\"><div class=\"d-flex flex-column\"><a class=\"search-card__title\" href=" + _baseUrl + row.Slug + ">" + row.RoomName + "</a>" + review + "<div class=\"search-card__location\">" + row.SpaceName + "</div><ul class=\"search-card__list small\"><li><span>Venue Type: </span><span>" + row.BuildingType + "</span></li></ul></div><div class=\"search-card__amenities\"><span class=\"search-card__amenities__title\">Amenities</span><ul class=\"search-card__amenitieslist\"><li>" + wify + smoking + catering + adaAccessible + "</li></ul></div></div><div class=\"search-card__rightinfo\" style='min-width:125px;'><div class=\"search-card__capacity text-primary d-flex\"><ion-icon class=\"capacity-number__icon\" name=\"people\"></ion-icon><span> <strong>" + row.MaxCapacity + "</strong></span></div><ul class=\"search-card__price\"><li>" + hourlyRental + "</li><li>" + dailyRental + "</li><li><a class=\"btn btn-primary btn-block mt-3\" href=" + _baseUrl + row.Slug + ">View</a></li></ul></div></div></div>";
////    return col1 + col2;
////}

////function destroyGrid() {
////    if (_dataTable != null) {
////        _dataTable.fnDestroy();
////        $("#dataGrid tr").remove();
////    }
////}

////function setMarkers(venues) {
////    // Adds markers to the map.
////    var map = new google.maps.Map(document.getElementById('map'), {
////        zoom: 8,
////        center: { lat: 38.9053975, lng: -76.9891191 }
////    });
////    // Marker sizes are expressed as a Size of X,Y where the origin of the image
////    // (0,0) is located in the top left of the image.

////    // Origins, anchor positions and coordinates of the marker increase in the X
////    // direction to the right and in the Y direction down.
////    var image = {
////        url: './images/icons/logo-20-20.png',
////        // This marker is 20 pixels wide by 32 pixels high.
////        size: new google.maps.Size(20, 20),
////        // The origin for this image is (0, 0).
////        origin: new google.maps.Point(0, 0),
////        // The anchor for this image is the base of the flagpole at (0, 32).
////        anchor: new google.maps.Point(0, 32)
////    };
////    // Shapes define the clickable region of the icon. The type defines an HTML
////    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
////    // The final coordinate closes the poly by connecting to the first coordinate.
////    var centerLat = 38.9053975;
////    var centerLang = -76.9891191;
////    $.each(venues.data, function (i, venue) {
////        if (i == 0) {
////            centerLat = venue.Latitude;
////            centerLang = venue.Longitude;
////        }
////        var marker = new google.maps.Marker({
////            position: { lat: venue.Latitude, lng: venue.Longitude },
////            map: map,
////            icon: image,
////            title: venue.RoomName,
////            zIndex: venue.RoomId,
////            zoom: 17
////        });
////    });
////    map.setCenter({ lat: centerLat, lng: centerLang });
////}