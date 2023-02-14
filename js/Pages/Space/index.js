var createUrl = _baseUrl + "/Space/AddEdit/";
var editUrl = _baseUrl + "/Space/AddEdit/";
var deletelUrl = _baseUrl + "/Space/Delete/";
var searchUrl = _baseUrl + "/Space/Search";

$(document).ready(function () {
    var columns = [
        { "title": "SpaceName", "data": "Name", "defaultContent": "" },
        { "title": "SpaceId", "data": "SpaceId", "defaultContent": "" },
        { "title": "Manage", "data": "SpaceId", "orderable": false, "render": function (data, type, row, meta) { return createActionRow(data, type, row, meta) } },
    ];
    var addButton = "<a href=\"" + createUrl + "\" class=\"btn btn-primary btn-sm grid-search-button\"><i class=\"fas fa-plus\"></i> Add New</a>";
    gridButtons = [addButton];
    var dataTable = CreateDataTablesGrid("dataGrid", columns, searchUrl, null, gridButtons, false);
});


function createActionRow(data, type, row, meta) {
    var editLink = '<a href="' + editUrl + row.Id + '" title=\"Edit\"><i class="fas fa-edit"></i></a>';
    var deleteLink = '<a href="#" onclick="javascript: deleteRecord(\'' + row.Id + '\',\'' + deletelUrl + '\',\'dataGrid\');" title=\"Delete\"><i class=\"fas fa-trash\"></i></a>';
    return editLink + deleteLink;
}