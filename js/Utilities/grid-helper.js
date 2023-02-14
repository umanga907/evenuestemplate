//var _baseUrl = window.location.protocol + "//" + window.location.host;//.origin;
var _gridDomModel = "<'row'<'col-sm-6'l><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'i><'col-sm-7'p>>";
var _infoText = "Showing _PAGE_ of _PAGES_ entries";
var _infoEmptyText = "No Records found";
var _pageLength = 10;
$.extend(true, $.fn.dataTable.defaults, {
    "searching": true,
    "ordering": true,
    "processing": true,
    "serverSide": true,
    "searchDelay": 800,
    "info": true,
    "stateSave": false,
    "pagingType": "full_numbers",
    "language": {
        "paginate": {
            "first": "<ion-icon name='skip-backward'></ion-icon>",
            "previous": "<ion-icon name='rewind'></ion-icon>",
            "next": "<ion-icon name='fastforward'></ion-icon>",
            "last": "<ion-icon name='skip-forward'></ion-icon>"
        },
        "info": _infoText,
        "infoEmpty": _infoEmptyText,
    },
    "pageLength": _pageLength,
    "lengthMenu": [[10, 20, 50, 100,10000], [10, 20, 50, 100,'All']],
    "order": [[0, "asc"]],
    "dom": _gridDomModel,
    //fixedHeader: {
    //    header: true,
    //    footer: false,
    //    headerOffset: 50,
    //    footerOffset: 0,
    //}
});

function enableScrollFeature(scrollY, scrollCollapse) {
    $.fn.dataTable.defaults.scroller =  {
        displayBuffer: 10,
        loadingIndicator: true
    },
    $.fn.dataTable.defaults.scrollY = scrollY;
    $.fn.dataTable.defaults.scrollCollapse = scrollCollapse;
    $.fn.dataTable.defaults.deferRender = true;
    $.fn.dataTable.defaults.scroller = true;
    $.fn.dataTable.defaults.keys = true;
}

function enableRowSelectFeature() {
    $.fn.dataTable.defaults.dom = "<'row'<'col-sm-6'B><'col-sm-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-5'><'col-sm-7'>>";
}

function CreateDataTablesGrid(tableName, columns, searchUrl, searchFields,
    gridButtons, allowExport, sortOrder, sortIndex,selectMode, sucessFunction) {
    if (sortIndex == null) {
        sortIndex = 0;
    }
    if (selectMode == null) {
        selectMode = "api"//api,single,multi,os
    }
    var dataTable = $('#' + tableName).dataTable({
        "createdRow": function (row, data, dataIndex) {
            if (data.Selected == true) {
                $(row).addClass('selected');
            }
        },
        "buttons": [
            {
                text: 'Select All',
                action: function () {
                    var table = $('#' + tableName).dataTable().api();
                    table.rows().select();
                }
            },
            {
                text: 'Select None',
                action: function () {
                    var table = $('#' + tableName).dataTable().api();
                    table.rows().deselect();
                }
            }
        ],
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
            $.ajax({
                "dataType": 'json', "type": "GET", "url": searchUrl, "data": aoData, "success": fnCallback, "error": function (xhr, textStatus, errorThrown) { $('#dataGrid_processing').hide(); var alert = CreateMessageBox(xhr.responseText, 'Error'); $(alert).prependTo($('#' + tableName).parent()).show(); }
            });
        },
        "initComplete": function (settings, json) {
            if (sucessFunction != null) {
                executeFunctionByName(sucessFunction, [json]);
            }
        },
        "columns": columns,
        "select": { style: selectMode },
        "order": (sortOrder != null) ? [[sortIndex, "desc"]] : [[sortIndex, "asc"]],
        "dom": _gridDomModel,
        "pageLength": _pageLength,
        "language": {
            "paginate": {
                "first": "<ion-icon name='skip-backward'></ion-icon>",
                "previous": "<ion-icon name='rewind'></ion-icon>",
                "next": "<ion-icon name='fastforward'></ion-icon>",
                "last": "<ion-icon name='skip-forward'></ion-icon>"
            },
            "info": _infoText,
            "infoEmpty": _infoEmptyText,
        },
    });
    var serach = $("div.dataTables_filter input");
    serach.unbind();
    serach.bind('keypress', function (e) {
        if (e.which == 13) { dataTable.fnFilter(serach.val(), null, false, true); }
    });
    var searchButton = $("<a class=\"btn grid-search-button\" href=\"#\" id=\"searchButton\"><i class=\"fas fa-search\"></i></a>").insertAfter(serach).on('click', function (e) {
        dataTable.fnFilter(serach.val(), null, false, true);
    });
    if (gridButtons != null) {
        var buttons = "";
        for (i = 0; i < gridButtons.length; i++) {
            buttons += gridButtons[i];
        }
        $(buttons).insertAfter(searchButton);
    }
    //if (allowExport) {
    //    $(".dt-buttons").insertAfter($(searchButton));
    //} else {
    //    $(".dt-buttons").hide();
    //}
    return dataTable;
}

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


function deleteRecord(rowId, deleteUrl, gridName) {
    if (confirm("Are you sure you want to delete the record?")) {
        var url = deleteUrl + rowId;
        $.ajax({
            url: url,
            type: "POST",
            async: false,
            cache: false,
            success: function (result) {
                refreshGrid(gridName);
            }
        });
    }
} 

function formatGridDateRow(data, type, row, meta) {
    if (data != null) {
        return moment(data).format(_dateFormat);
    } else {
        return data;
    }
}

function executeFunctionByName(functionName, params) {
    var fn = window[functionName];
    if (typeof fn === "function") {
        if (params == null) {
            fn();
        } else {
            fn.apply(null, params);
        }
    }
}