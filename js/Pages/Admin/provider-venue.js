$(document).ready(function () {
    CreateDataTablesGrid("VenueGridTable", venueColumns, searchUrl, null, null, 'desc', 5);
    CreateDataTablesGrid("RoomGridTable", roomColumns, roomSearchUrl, null, null, 'asc', 4);
    $('#searchButton').remove();
    $("#VenueGridTable_length").parent().parent().hide();
    $("#VenueGridTable_info").parent().parent().hide();
    $("#RoomGridTable_length").parent().parent().hide();
    $("#RoomGridTable_info").parent().parent().hide();
});

var searchUrl = hostUrl + "/admin/provider/venue?handler=VenueSearch";
var editUrl = hostUrl + "/admin/provider/venue/edit?spaceId=";
var venueColumns = [
    { "title": "", "data": "", "defaultContent": "", "sorting": false, "render": function (data, type, row, meta) { return getEditLink("Edit", editUrl+row.SpaceId) } },
    { "title": "Venue ID#", "data": "SpaceId", "defaultContent": "" },
    { "title": "Venue Name", "data": "SpaceName", "defaultContent": "" },
    { "title": "Address", "data": "Address", "defaultContent": ""},
    { "title": "City", "data": "City", "defaultContent": "" },
    { "title": "State", "data": "State", "defaultContent": "" },
    { "title": "Joined Date", "data": "CreatedDate", "render": function (data, type, row, meta) { return getDate(row.CreatedDate) } },
];

var roomSearchUrl = hostUrl + "/admin/provider/venue?handler=RoomSearch";
var roomEditUrl = hostUrl + "/admin/room/addedit/";
var roomColumns = [
    { "title": "", "data": "", "defaultContent": "", "sorting": false, "render": function (data, type, row, meta) { return getEditLink("Edit", `${roomEditUrl}${row.SpaceId}/${row.RoomId}`) }  },
    { "title": "", "data": "ThumbnailId", "defaultContent": "", "sorting": false, "render": function (data, type, row, meta) { return `<div class="roomimg text-center"><a href="${hostUrl}/${row.Slug}" target="_new"><img src="${hostUrl}/image/${row.ThumbnailId}"></a></div>` } },
    { "title": "Space Id", "data": "SpaceId", "defaultContent": "" ,"visible":false},
    { "title": "Room #", "data": "RoomId", "defaultContent": "" },
    { "title": "Room Name", "data": "RoomName", "defaultContent": "" },
    { "title": "City", "data": "City", "defaultContent": "" },
    { "title": "State", "data": "State", "defaultContent": "" },
    { "title": "Venue Name", "data": "SpaceName", "defaultContent": "" },
];
