$(document).ready(function () {
    $("#Search_Month").val(new Date().getMonth() + 1);
    var searchFields = ["Search_Month"];
    CreateDataTablesGrid("GridTable", columns, searchUrl, searchFields, null, 'desc', 4);
    $("#GridTable_length").parent().parent().hide();
    $("#GridTable_info").parent().parent().hide();
    DisplayLeadSummary(false);
});

var searchUrl = hostUrl + "/admin/provider/lead?handler=Search";
var columns = [
    { "title": "SpaceId", "data": "SpaceId", "defaultContent": "", "visible": false },
    { "title": "Lead #", "data": "LeadId", "defaultContent": "","render": function (data, type, row, meta) { return `<a href="${hostUrl}/admin/provider/leadsummary?id=${row.LeadId}">${row.LeadId}</a>`} },
    { "title": "Name of Renter", "data": "FirstName", "defaultContent": "", "render": function (data, type, row, meta) { return row.FirstName +' '+row.LastName }},
    { "title": "Room Requested", "data": "RoomName", "defaultContent": ""},
    { "title": "Event Date", "data": "MeetingStart", "render": function (data, type, row, meta) { return getDate(row.MeetingStart) } },
    { "title": "Lead Value ($)", "data": "LeadValue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Status", "data": "Status", "defaultContent": "" },
    { "title": "Final Sale ($)", "data": "NetSale", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "title": "Commission ($)", "data": "AmountDue", "defaultContent": "$0.00", render: $.fn.dataTable.render.number(',', '.', 2) },
    { "data": "LeadWorkItemId", "visible": false }
];

function DisplayLeadSummary(refreshGrid) {

    if (refreshGrid) {
        $('#GridTable').dataTable().fnDraw();
    }
    let month = $("#Search_Month").val();
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
            $('#FunnelLeadTotal').val(summary.Leads);
            $('#FunnelLeadValue').text(`$${summary.LeadValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#FunnelNetSale').text(`$${summary.NetSale.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            $('#FunnelAccepted').text(`${summary.Accepted}`);
            $('#FunnelAcceptedPercent').val(summary.AcceptedPercent);
            $('#FunnelDeclined').text(`${summary.Declined}`);
            $('#FunnelDeclinedPercent').val(summary.DeclinedPercent);
            $('#FunnelBooked').text(`${summary.Booked}`);
            $('#FunnelBookedPercent').val(summary.BookedPercent);
            $('#FunnelExpired').text(`${summary.Expired}`);
            $('#FunnelExpiredPercent').val(summary.ExpiredPercent);
            $('#FunnelLostSale').text(`$${summary.LostSale.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`);
            drawFunnelChart();
        },
        error: function (xhr, error) {
            alert(xhr.responseText);
        }
    });
}

function drawFunnelChart() {
    let data = [
        ["Accepted", d3.format(",.2f")($('#FunnelAcceptedPercent').val())],
        ["Booked", d3.format(",.2f")($('#FunnelBookedPercent').val())],
        ["Expired", d3.format(",.2f")($('#FunnelExpiredPercent').val())],
        ["Rejected", d3.format(",.2f")($('#FunnelDeclinedPercent').val())]
    ];
    $("#FunnelLeadTotalLabel").text(`Total Leads: ${$('#FunnelLeadTotal').val()}`)
    data = data.sort(function (a, b) {
        return b[1] - a[1]
    });
    var options = {
        chart: {
            width: 350,
            height: 350,
            bottomWidth: 1 / 3,
            bottomPinch: 0,
            inverted: false,
            horizontal: false,
            animate: 0,
            curve: {
                enabled: false,
                height: 20,
                shade: -0.4,
            },
            totalCount: $('#FunnelLeadTotal').val(),
        },
        block: {
            dynamicHeight: false,
            dynamicSlope: false,
            barOverlay: false,
            fill: {
               // scale: scaleOrdinal(schemeCategory10).domain(range(0, 10)),
                type: 'solid',
            },
            minHeight: 0,
            highlight: false,
        },
        label: {
            enabled: true,
            fontFamily: null,
            fontSize: '14px',
            fill: '#fff',
            format: '{l}: {f}%',
        },
        tooltip: {
            enabled: false,
            format: '{l}: {f}',
        },
        events: {
            click: {
                block: null,
            },
        },
    };

    var chart = new D3Funnel("#chartdiv");
    chart.draw(data, options);
    
}