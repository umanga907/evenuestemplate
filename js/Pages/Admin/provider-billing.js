$(document).ready(function () {
    CreateDataTablesGrid("GridTable", columns, searchUrl, searchFields, null, 'desc', 1);
    $("#GridTable_length").parent().parent().hide();
    $("#GridTable_info").parent().parent().hide();
});

var searchUrl = hostUrl + "/admin/provider/billing?handler=Search";
var editUrl = hostUrl + "/admin/lead/addedit?spaceId=";
var searchFields = ["Search_Year"];
var columns = [
    { "title": "LeadWorkItemId", "data": "LeadWorkItemId", "defaultContent": "", "visible": false },
    { "title": "Lead #", "data": "LeadId", "defaultContent": "" },
    { "title": "Name of Renter", "data": "FirstName", "defaultContent": "", "render": function (data, type, row, meta) { return row.FirstName + ' ' + row.LastName } },
    { "title": "Room Requested", "data": "RoomName", "defaultContent": "" },
    /*{ "title": "Date Created", "data": "DateCreated", "render": function (data, type, row, meta) { return getDate(row.DateCreated) } },*/
    { "title": "Event Date", "data": "MeetingStart", "render": function (data, type, row, meta) { return getDate(row.MeetingStart) } },
    //{ "title": "Lead Value ($)", "data": "LeadValue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Final Sale ($)", "data": "NetSale", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Commission Due ($)", "data": "AmountDue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
   /* { "title": "Status", "data": "Status", "defaultContent": "" },*/
];

function updateContact() {
    let antiForgeryToken = $("#AntiForferyToken").val();
    $.ajax({
        type: "POST",
        cache: false,
        url: `${hostUrl}/admin/provider/billing?handler=UpdateContact`,
        data: { FirstName: $("#InvoiceContact_FirstName").val(), LastName: $("#InvoiceContact_LastName").val(), Email: $("#InvoiceContact_Email").val(), Phone: $("#InvoiceContact_Phone").val() },
        beforeSend: function (xhr) {
            $('#ServerMessage').hide();
            xhr.setRequestHeader(_antiforgeryTokenHeaderName, antiForgeryToken);
        },
        success: function (summary) {
            alert("Contact updated successfully!");
        },
        error: function (xhr, error) {
            alert(xhr.responseText);
        }
    });
}

function DisplayBillingSummary() {
    refreshGrid("GridTable");
}