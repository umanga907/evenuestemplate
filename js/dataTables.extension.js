var _baseUrl = window.location.protocol + "//" + window.location.host;//.origin;
$.extend(true, $.fn.dataTable.defaults, {
    "searching": true,
    "ordering": true,
    "processing": true,
    "serverSide": true,
    "searchDelay": 800,
    "info": true,
    "stateSave": false,
    "scrollToTop": true,
    "oLanguage": {
        "sEmptyTable": "No data available"
    },
    "pagingType": "full_numbers",
    "language": {
        "paginate": {
            "first": "<i class=\"fas fa-step-backward\"></i>",
            "previous": "<i class=\"fas fa-backward\"></i>",
            "next": "<i class=\"fas fa-forward\"></i>",
            "last": "<i class=\"fas fa-step-forward\"></i>"
        }
    },
    "pageLength": 10,
    "lengthMenu": [[10, 20, 50, 100,10000], [10, 20, 50, 100,'All']],
    "order": [[0, "asc"]],
    buttons: [{extend: 'print',exportOptions: {columns: [ 2,5,6,7,8,9,10,11,12,13,14,15,16]}, className: 'btn btn-sm btn-primary', text: '<span class=\'glyphicon glyphicon-print\'></span> Print',orientation: 'landscape',columns: ':visible', customize: function ( win ) {
        $(win.document.body).css('font-size', '10pt');//.prepend('<img src="http://datatables.net/media/images/logo-fade.png" style="position:absolute; top:0; left:0;" />');
        $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
        }
    }],
    //"dom": "<'row'<'col-sm-4'l><'col-sm-1'><'col-sm-3'f><'col-sm-1'><'col-sm-1'B><'col-sm-2'>><<'row'<'col-sm-5'><'col-sm-7'p>>'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>"
});

function CreateDataTablesGrid(tableName, columns, searchUrl, searchFields, gridButtons, sortOrder,sortIndex) {
    if (sortIndex == null) {
        sortIndex = 0;
    }
    var dataTable = $('#' + tableName).dataTable({
        "serverData": function (sSource, aoData, fnCallback) {
            var sortColIndex = aoData[2].value[0].column;
            var sortDirection = aoData[2].value[0].dir;
            var sortColumn = aoData[1].value[sortColIndex].data;
            aoData.push({ "name": "SortColumn", "value": sortColumn });
            aoData.push({ "name": "SortDirection", "value": sortDirection });
            var fullTextSearchValue = aoData[5].value.value;
            aoData.push({ "name": "Search_FullText", "value": fullTextSearchValue });
            if (searchFields == null) {
                $("[id^='Search_']").each(function (index, element) {
                    aoData.push({ "name": element.id, "value": $(element).val() });
                });
            } else {
                for (var i = 0; i < searchFields.length; i++) {
                    searchField = searchFields[i];
                    aoData.push({ "name": searchField, "value": $("#"+searchField).val() });
                }
            }
            $.ajax({ "dataType": 'json', "type": "GET", "url": searchUrl, "data": aoData, "success": fnCallback, "error": handleAjaxError });
        },
        "columns": columns,
        "order": (sortOrder != null) ? [[sortIndex, "desc"]] : [[sortIndex, "asc"]],
        "drawCallback": function (settings) {
            window.scroll(0,0);
        },
        colReorder: false,
        stateSave: false
    });
    var serach = $(`div.dataTables_filter input`);
    serach.unbind();
    serach.bind('keypress', function (e) {
        if (e.which == 13) { dataTable.fnFilter(serach.val(), null, false, true); }
    });
        
    var searchButton = $("<a class=\"btn btn-sm btn-primary\" href=\"#\" id=\"searchButton\"><i class=\"fas fa-search\"></i></a>").insertAfter(serach).on('click', function (e) {
        dataTable.fnFilter(serach.val(), null, false, true);
    });
    
    if (gridButtons != null) {
        var buttons = "";
        for (let i = 0; i < gridButtons.length; i++) {
            buttons += gridButtons[i];
        }
        $(buttons).insertAfter(searchButton);
    }
    setSearchTextboxStringLength();
    return dataTable;
}

function handleAjaxError(xhr) {
    $("#GridTable_processing").hide();
    hideProgressBar();
    debugger;
    var message = "Error";
    if (xhr.status === 404) {
        message = "The page you are requesting is not found.";
    }
    else if (xhr.status === 400 && xhr.responseText === "") {
        message = xhr.statusText
    }
    else {
        var errors = JSON.parse(xhr.responseText);
        var errorMessage = errors[0];
        message = errorMessage.Message;
    }
    if (message.indexOf("Unauthorized") != -1) {
        message = "Sorry, your session has expired. Please <a href='/account/login'>re-login</a> again to continue.";
    }
    var alert = makeAlertBox(message, "Warning");
    $(alert).prependTo(".card-body").show();
}

function setSearchTextboxStringLength() {
    $('input[type=search]').attr('StringLength', '50');
};

function refreshGrid(gridName) {
    var dataTable = $('#' + gridName).dataTable();
    dataTable.fnDraw();
}

function checkAll(parentCheckBox, childCheckBox) {
    var isChecked = $('input[id="' + parentCheckBox + '"]').prop('checked');
    if (isChecked) {
        $('input[id="' + childCheckBox + '"]').prop('checked', true);
    }
    else {
        $('input[id="' + childCheckBox + '"]').prop('checked', false);
    }
}

function deleteRecord(deleteUrl, gridName) {
    if (confirm("Are you sure you want to delete the record?")) {
        var url = deleteUrl;
        $.ajax({
            url: url,
            type: "GET",
            async: false,
            cache: false,
            success: function (result) {
                refreshGrid(gridName);
            },
            error: function (xhr) {
                handleAjaxError(xhr);
            }
        });
    }
}

function getBoolean(value) {
    if (value) {
        return `<span class="badge bg-success">Yes</span>`;
    } else {
        return `<span class="badge bg-warning text-dark">No</span>`;
    }
}

function getActiveStatus(value) {
    if (value == 1) {
        return `<span class="badge bg-success">Active</span>`;
    } else {
        return `<span class="badge bg-warning text-dark">Inactive</span>`;
    }
}

function getEmail(email) {
    return `<a href="mailto:${email}">${email}</a>`;
}

function getEditLink(text, editUrl) {
    return `<div class="text-center"><a class="btn common_btn text-center" href="${editUrl}">${text}</a></div>`;
}

function getDate(data) {
    if (data != null) {
        return moment(data).format('MM/DD/YYYY');
    }
    else {
        return ""
    }
}