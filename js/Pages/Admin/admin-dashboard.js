$(document).ready(function () {
    $("#LeadSummaryMonth").val(new Date().getMonth()+1);
    DisplayLeadSummary();
});


function DisplayLeadSummary() {
    
    let month = $("#LeadSummaryMonth").val();
    $.ajax({
        type: "GET",
        cache: false,
        url: `${hostUrl}/admin/home?handler=LeadSummary&month=${month}&year=${new Date().getFullYear()}`,
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