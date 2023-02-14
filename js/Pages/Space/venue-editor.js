$(document).ready(function () {
    Uploader('Agreement', 'BrowseAgreement', 'ContainerAgreementUpload', 'AgreementUploadStatus', 'pdf', 'PDF files',1, spaceId, roomId, tempRoomId);
    Uploader('CovidRule', 'BrowseCovidRule', 'ContainerCovidRuleUpload', 'CovidRuleUploadStatus', 'pdf', 'PDF files',1, spaceId, roomId, tempRoomId);
    ShowUploadAgreement($("#RentalAgreementFile[value='custom']:checked").val() == 'custom');
    ShowHideStarRating();
});

function ShowUploadAgreement(show) {
    if (show) {
        $("#ContainerAgreementUpload").show();
    } else {
        $("#ContainerAgreementUpload").hide();
    }
}

function ShowHideStarRating() {
    if ($("#VenueRegisterView_VenueAddEditModel_BuildingType option:selected").text() == 'Hotel Meeting Room') {
        $("#StarRatingDiv").show();
    } else {
        $("#StarRatingDiv").hide();
    }
}