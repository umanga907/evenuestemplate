var accessToken = "";
var tempRoomId = "";
var roomId = 0;
var uploadServiceUrl = "";
var hostUrl = "";

function Uploader(filetype, browseButton, container, statusIndicator,
    extension, extensionDetail, maxAllowedFiles, spaceId, roomId, tempRoomId) {
    var containerdiv = document.getElementById(container);
    var uploader = new plupload.Uploader({
        runtimes: 'html5',
        browse_button: browseButton,
        container: containerdiv,
        url: uploadServiceUrl,
        filters: {
            max_file_size: '10mb',
            mime_types: [
                { title: extensionDetail, extensions: extension }
            ]
        },
        multipart_params: {
            'SpaceId': spaceId, 'RoomId': roomId, 'DocumentType': filetype, 'TempRoomId': tempRoomId
        },
        headers: { 'Authorization': accessToken },
        init: {
            FilesAdded: function (up, files) {
                var numberOffiles = $(containerdiv).find("#FileLink").length;
                if (numberOffiles >= maxAllowedFiles) {
                    alert(`Maximum allowed files are ${maxAllowedFiles}. You can\'t upload more than ${maxAllowedFiles} files!`);
                    return false;
                }
                uploader.start();
                $("#" + statusIndicator).html("Uploading...");
            },

            UploadProgress: function (up, file) {
                if (file.percent == 100) {
                    $("#" + statusIndicator).html('');
                } else {
                    $("#" + statusIndicator).html("Uploading..." + file.percent + "% Complete");
                }
            },
            FileUploaded: function (up, file) {
                DisplayFiles(filetype, spaceId, roomId, tempRoomId);
            },
            Error: function (up, err) {
                $("#" + statusIndicator).html("Error: " + err.code + ": " + err.message);
            }
        }
    });
    uploader.init();
    DisplayFiles(filetype, spaceId, roomId, tempRoomId);
}

function getUrlParameter(content, name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(content);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function DisplayFiles(filetype, spaceId, roomId, tempRoomId) {
    $.ajax({
        type: "GET",
        cache: false,
        url: hostUrl + "/FilesPartial?spaceId=" + spaceId + "&roomId=" + roomId + "&docType=" + filetype + "&tempRoomId=" + tempRoomId,
        success: function (o) {
            if (filetype === "Photo") {
                o += `<div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                <div class="upload_add_box" style="cursor:pointer;" onclick="openDialog('${filetype}');">
                    <img src="/images/addimg.png">
                </div>
                </div>`;
            } else if (filetype === "Menu" || filetype === "FloorPlan"
                || filetype === "Agreement" || filetype === "CovidRule") {
                o += `<div class="col-lg-3 col-md-5 col-sm-6 mb-3">
                <div class="file-upload_box" style="cursor:pointer;" onclick="openDialog('${filetype}');">
                    <img src="/images/addpdf.png">
                </div>
                </div>`;
            }
            $('#' + filetype + 'Content').html(o);
            HideProgress();
        }
    });
}

function deletefile(filetype, fileId, spaceId, roomId, showConfirm, tempRoomId) {
    if (showConfirm) {
        var result = confirm("Would you like to delete the selected file?");
        if (!result) {
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: hostUrl + "/DeleteFile?fileId=" + fileId + "&docType=" + filetype + "&spaceId=" + spaceId + "&roomId=" + roomId + "&tempRoomId=" + tempRoomId,
        success: function (o) {
            if (o == "OK") {
                HideProgress();
                $('#' + filetype + fileId).remove();
                DisplayFiles(filetype, spaceId, roomId, tempRoomId);
            }
            else {
                alert('Error deleting file.');
            }
        }
    });
}

function openDialog(fileType) {
    $("#Browse" + fileType).click();
}

function setAsDefault(imageId, roomId) {
    $.ajax({
        type: "POST",
        url: hostUrl + "/SetAsDefaultImage?imageId=" + imageId + "&roomId=" + roomId,
        success: function (o) {
            if (o == "OK") {
                HideProgress();
            }
            else {
                alert('Error Setting Default Image file.');
            }
        }
    }); 
}
