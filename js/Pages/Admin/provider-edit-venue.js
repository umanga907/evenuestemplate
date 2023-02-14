$(document).ready(function () {
    Uploader('CovidRule', 'BrowseCovidRule', 'ContainerCovidRuleUpload', 'CovidRuleUploadStatus', 'pdf', 'PDF files',1, spaceId, 0, 0);
    ShowHideStarRating();
});

function ShowHideStarRating() {
    if ($("#VenueAddEditModel_BuildingType option:selected").text() == 'Hotel Meeting Room') {
        $("#StarRatingDiv").show();
    } else {
        $("#StarRatingDiv").hide();
    }
}