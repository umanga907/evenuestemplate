$(document).ready(function () {
    $("#LeadSummaryMonth").val(new Date().getMonth()+1);
    DisplayAnnouncements();
    DisplayLeadSummary();
    DisplayIndustryNews();
    CreateDataTablesGrid("RoomGridTable", roomColumns, roomSearchUrl, null, null, 'desc', 2);
    CreateDataTablesGrid("BillingGridTable", billingColumns, bilingSearchUrl, null, null, 'desc', 4);
    $('#searchButton').remove();
    $("#RoomGridTable_length").parent().parent().hide();
    $("#RoomGridTable_info").parent().parent().hide();
    $("#BillingGridTable_length").parent().parent().hide();
    $("#BillingGridTable_info").parent().parent().hide();
});

var roomSearchUrl = hostUrl + "/admin/provider/venue?handler=RoomSearch";
var roomEditUrl = hostUrl + "/admin/room/addedit/";
var roomColumns = [
    /*{ "title": "Edit", "data": "", "defaultContent": "", "render": function (data, type, row, meta) { return getEditLink("Edit", `${roomEditUrl}${row.SpaceId}/${row.RoomId}`) } },*/
    { "title": "", "data": "ThumbnailId", "defaultContent": "","sorting":false, "render": function (data, type, row, meta) { return `<div class="roomimg text-center"><a href="${hostUrl}/${row.Slug}" target="_new"><img src="${hostUrl}/image/${row.ThumbnailId}"></a></div>` } },
    { "title": "Space Id", "data": "SpaceId", "defaultContent": "", "visible": false },
    { "title": "Room #", "data": "RoomId", "defaultContent": "" },
    { "title": "Room Name", "data": "RoomName", "defaultContent": "" },
    { "title": "City", "data": "City", "defaultContent": "" },
    { "title": "State", "data": "State", "defaultContent": "" },
    { "title": "Primary Name", "data": "PrimaryContact", "defaultContent": "" },
    { "title": "Primary Email", "data": "PrimaryContactEmail", "defaultContent": "" },
];


var bilingSearchUrl = hostUrl + "/admin/provider/billing?handler=Search";
var billingColumns = [
    { "title": "LeadWorkItemId", "data": "LeadWorkItemId", "defaultContent": "", "visible": false },
    { "title": "Lead #", "data": "LeadId", "defaultContent": "", "sorting": false },
    { "title": "Name of Renter", "data": "FirstName", "defaultContent": "", "sorting": false, "render": function (data, type, row, meta) { return row.FirstName + ' ' + row.LastName } },
    { "title": "Room Requested", "data": "RoomName", "defaultContent": "", "sorting": false},
    { "title": "Event Date", "data": "MeetingStart", "defaultContent": "", "sorting": false, "render": function (data, type, row, meta) { return getDate(row.MeetingStart) } },
    //{ "title": "Lead Value ($)", "data": "LeadValue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Final Sale ($)", "data": "NetSale", "defaultContent": "$0.00", "sorting": false, render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Commission Due ($)", "data": "AmountDue", "defaultContent": "$0.00", "sorting": false, render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Status", "data": "Status", "defaultContent": "", "sorting": false },
];


function DisplayAnnouncements() {

    $.ajax({
        type: "GET",
        cache: false,
        url: hostUrl + "/admin/provider/home?handler=Announcements",
        success: function (announcements) {
            let list = '';
            let count = 1;
            $.each(announcements, function (key, announcement) {
                list += `${announcement.Title}<br/>`;
                count++;
            })
            $("#Announcements").html(list);
    }
    });
}

function DisplayIndustryNews() {

    $.ajax({
        type: "GET",
        cache: false,
        url: hostUrl + "/admin/provider/home?handler=IndustryNews",
        success: function (industryNewses) {
            let list = '';
            $.each(industryNewses, function (key, industryNews) {
                list += `<p><h6 style="font-size: 16px;font-weight: 700;">${industryNews.Title}</h6>${industryNews.Body}</p>`;
            })
            $("#IndustryNews").html(list);
        }
    });
}

function DisplayLeadSummary() {
    
    let month = $("#LeadSummaryMonth").val();
    $.ajax({
        type: "GET",
        cache: false,
        url: `${hostUrl}/admin/provider/home?handler=LeadSummary&month=${month}&year=${new Date().getFullYear()}`,
        success: function (summary) {
            $('#leadCount').text(summary.Leads);
            $('#leadValue').text(`$${summary.LeadValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#leadBookedCount').text(summary.Booked);
            $('#leadExpiredCount').text(summary.Expired);
            $('#leadConversion').text(`${summary.Conversion}%`);
            $('#AmountDue').text(`$${summary.AmountDue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
        },
        error: function (xhr, error) {
            alert(xhr.responseText);
        },
    });
}