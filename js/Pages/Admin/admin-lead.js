$(document).ready(function () {
    $("#LeadSummaryMonth").val(new Date().getMonth()+1);
    DisplayLeadSummary();
    CreateDataTablesGrid("GridTable", columns, searchUrl, null, null, 'desc', 4);
});

var searchUrl = hostUrl + "/admin/lead?handler=Search";
var columns = [
    { "title": "SpaceId", "data": "SpaceId", "defaultContent": "", "visible": false },
    { "title": "Lead #", "data": "LeadId", "defaultContent": "" },
    { "title": "Name of Renter", "data": "FirstName", "defaultContent": "", "render": function (data, type, row, meta) { return row.FirstName +' '+row.LastName }},
    { "title": "Room Requested", "data": "RoomName", "defaultContent": ""},
    { "title": "Event Date", "data": "MeetingStart", "render": function (data, type, row, meta) { return getDate(row.MeetingStart) } },
    { "title": "Lead Value ($)", "data": "LeadValue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Net Sale ($)", "data": "NetSale", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2)},
    { "title": "Commission ($)", "data": "AmountDue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "data": "LeadWorkItemId", "visible": false }
];

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

            $('#FunnelLeadCount').text(summary.Leads);
            $('#FunnelLeadTotal').text(`Total Leads: ${summary.Leads}`);
            $('#FunnelLeadValue').text(`$${summary.LeadValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#FunnelNetSale').text(`$${summary.NetSale.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#FunnelAccepted').text(`Accepted: ${summary.Accepted}`);
            $('#FunnelAcceptedPercent').text(`${summary.Accepted}/${summary.AcceptedPercent.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`);
            $('#FunnelDeclined').text(`Declined: ${summary.Declined}`);
            $('#FunnelDeclinedPercent').text(`${summary.Declined}/${summary.DeclinedPercent.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`);
            $('#FunnelBooked').text(`Booked: ${summary.Booked}`);
            $('#FunnelBookedPercent').text(`${summary.Booked}/${summary.BookedPercent.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`);
            $('#FunnelExpired').text(`Expired: ${summary.Expired}`);
            $('#FunnelExpiredPercent').text(`${summary.Expired}/${summary.ExpiredPercent.toFixed().replace(/\d(?=(\d{3})+\.)/g, '$&,')}%`);
            $('#FunnelLostSale').text(`$${summary.LostSale.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
        },
        error: function (xhr, error) {
            alert(xhr.responseText);
        }
    });
}