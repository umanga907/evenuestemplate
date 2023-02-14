$(document).ready(function () {
    CreateDataTablesGrid("GridTable", venueColumns, searchUrl, null, null, 'desc', 6);
    $(".sorting_disabled").hide();
    $("#GridTable_filter").hide();
    $("#GridTable_length").parent().parent().hide();
    $("#GridTable_info").parent().parent().hide();
});

var searchUrl = hostUrl + "/admin/provider/review?handler=Search";
var venueColumns = [
    { "title": "", "data": "ReviewId", "defaultContent": "", "sorting":false, "render": function (data, type, row, meta) { return getReview(row) }  },
    { "title": "Text", "data": "Text", "defaultContent": "","visible":false },
    { "title": "Rating", "data": "Rating", "defaultContent": "", "visible": false},
    { "title": "SpaceName", "data": "SpaceName", "defaultContent": "", "visible": false},
    { "title": "Reviewer Name", "data": "ReviewerName", "defaultContent": "", "visible": false},
    { "title": "Email", "data": "Email", "defaultContent": "", "visible": false},
    { "title": "Review Date", "data": "ReviewDate", "visible": false, "render": function (data, type, row, meta) { return getDate(row.ReviewDate) } },
];

function getReview(row) {
    return `<div class="col-md-12">
                <div class="member-new-since">
                    <h6 style="font-size: 16px;font-weight: 600;color: #0fb5cd;">${getDate(row.ReviewDate)}
                        <span style="color: #636363; margin: 0 7px;"> Post by</span>${row.ReviewerName}
                    </h6>
                    <p style="color: #636363;font-weight: 100;">${row.Text}</p>
                </div>
            </div>`;
}

function SendReviewInvite() {
    let antiForgeryToken = $("#AntiForferyToken").val();
    let email = $("#ReviewInviteView_Email").val();
    let note = $("#ReviewInviteView_Note").val();
    if (email === '' && note === '') {
        alert('Email and Note is required');
        return;
    } else if (email === '') {
        alert('Email is required');
        return;
    } else if (note === '') {
        alert('Note is required');
        return;
    }
    $.ajax({
        type: "POST",
        cache: false,
        url: `${hostUrl}/admin/provider/review?handler=ReviewInvite`,
        data: { Email: email, Note: note},
        beforeSend: function (xhr) {
            $('#ServerMessage').hide();
            xhr.setRequestHeader(_antiforgeryTokenHeaderName, antiForgeryToken);
        },
        success: function (summary) {
            alert("Invitation sent successfully!");
            $("#staticBackdrop").modal('hide');
            $("#ReviewInviteView_Email").val('');
            $("#ReviewInviteView_Note").val('')
        },
        error: function (xhr, error) {
            alert(xhr.responseText);
        }
    });
}