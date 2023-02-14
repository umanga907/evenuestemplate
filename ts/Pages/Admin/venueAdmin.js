(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[9],{

/***/ 49:
/*!******************************************!*\
  !*** ./Client/Pages/Admin/VenueAdmin.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VenueAdminManager": () => (/* binding */ VenueAdminManager)
/* harmony export */ });
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/UiHelper */ 0);
/* harmony import */ var _Common_HttpManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/HttpManager */ 13);
/* harmony import */ var _Common_GridManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common/GridManager */ 14);
/* harmony import */ var gridjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! gridjs */ 8);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class VenueAdminManager {
    constructor() {
        this._userRole = "";
    }
    InitGrid() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager = new _Common_GridManager__WEBPACK_IMPORTED_MODULE_2__.GridManager();
            let accessToken = document.getElementById("AccessToken");
            this._httpManager = new _Common_HttpManager__WEBPACK_IMPORTED_MODULE_1__.HttpManager(accessToken.value);
            let host = document.getElementById("HostName");
            this._hostUrl = host.value;
            let hostService = document.getElementById("HostServiceUrl");
            this._hostServiceUrl = hostService.value;
            let userRole = document.getElementById("Role");
            this._userRole = userRole.value;
            let searchButton = document.getElementById("searchButton");
            if (searchButton !== null) {
                searchButton.addEventListener("click", (e) => this.Search());
            }
            let gridSetting = new _Common_GridManager__WEBPACK_IMPORTED_MODULE_2__.GridSetting();
            gridSetting.SearchFields = ["Search_SpaceName", "Search_Address", "Search_City", "Search_State", "Search_Status"];
            gridSetting.SearchUrl = `${this._hostUrl}/admin/venue?handler=Search`;
            gridSetting.CreateUrl = `${this._hostUrl}/admin/venue?handler=Create`;
            gridSetting.EditUrl = `${this._hostUrl}/admin/venue?handler=Update`;
            gridSetting.DeleteUrl = `${this._hostUrl}//admin/venue?handler=Delete`;
            gridSetting.Columns = [
                { id: "SpaceId", name: "", sort: false, formatter: (cell, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_3__.html)(this.GetCard(this._hostUrl, row)) },
                { id: "RoomId", name: "Room Id", sort: false, hidden: true },
                { id: "SpaceName", name: "Space Name", hidden: true },
                { id: "RoomName", name: "Room Name", sort: true, hidden: true },
                { id: "Address", name: "Address", formatter: (_, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_3__.html)(this.GetAddress(row)), hidden: true },
                { id: "Address2", name: "Address2", hidden: true },
                { id: "City", name: "City", hidden: true },
                { id: "State", name: "State", hidden: true },
                { id: "Zip", name: "Zip", hidden: true },
                { id: "DailyRate", name: "Daily Rate", formatter: (cell) => `$${cell.toLocaleString()}`, hidden: true },
                { id: "HourlyRate", name: "Hourly Rate", formatter: (cell) => `$${cell.toLocaleString()}`, hidden: true },
                { id: "IsRoomActive", name: "Active", formatter: (cell) => this.GetYesNo(cell), hidden: true },
                { id: "IsRoomApproved", name: "Room Approved", formatter: (cell) => this.GetYesNo(cell), hidden: true },
                { id: "IsSpaceApproved", name: "Space Approved", formatter: (cell) => this.GetYesNo(cell), hidden: true },
                { id: "IsSpaceTemporary", name: "Space Temprory", formatter: (cell) => this.GetYesNo(cell), hidden: true },
                { id: "ThumbnailId", name: "Room Image", width: '200px', formatter: (_, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_3__.html)(this.GetImage(this._hostUrl, row)), hidden: true },
                { id: "Slug", name: "Slug", hidden: true },
                { id: "MaxCapacity", name: "MaxCapacity", hidden: true },
                { id: "RoomType", name: "Room Type", sort: true, hidden: true },
                { id: "BuildingType", name: "Building Type", hidden: true },
                { id: "Reviews", name: "Reviews", hidden: true },
                { id: "AverageRating", name: "Average Rating", hidden: true },
                { id: "WiFi", name: "WiFi", hidden: true },
                { id: "SmokingAllowed", name: "Smoking Allowed", hidden: true },
                { id: "InHouseCatering", name: "InHouse Catering", hidden: true },
                { id: "ADAAccessible", name: "ADA Accessible", hidden: true },
                { id: "GovtDiscount", name: "Govt Discount", hidden: true },
            ];
            this._gridManager.Init(gridSetting);
            this._gridManager.DataGrid.on('ready', () => __awaiter(this, void 0, void 0, function* () { return (this.InitEvents()); }));
        });
    }
    InitEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            let approvedSpaceElements = document.getElementsByClassName("form-check-input Approved-Space");
            for (let element of Array.from(approvedSpaceElements)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateApprovedSpaceStatus(element.id, el.checked); }));
            }
            let approvedRoomElements = document.getElementsByClassName("form-check-input Approved-Room");
            for (let element of Array.from(approvedRoomElements)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateApprovedRoomStatus(element.id, el.checked); }));
            }
            let activeRoomElements = document.getElementsByClassName("form-check-input Active-Room");
            for (let element of Array.from(activeRoomElements)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateActiveRoomStatus(element.id, el.checked); }));
            }
            let deleteRoomElements = document.getElementsByClassName("btn btn-danger btn-sm delete-room");
            for (let element of Array.from(deleteRoomElements)) {
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.DeleteRoom(element.id); }));
            }
            let paginationText = document.getElementsByClassName("gridjs-summary");
            const ths = document.querySelectorAll('th[data-column-id]');
            ths[0].innerText = paginationText[0].innerText;
        });
    }
    GetImage(host, row) {
        return `<img class=\"card-img-top\" src=\"${host}/Image/${row.cells[14].data}"\" title=\"${row.cells[3].data}\" alt=\"${row.cells[3].data}\"/>`;
    }
    GetYesNo(cell) {
        let boolValue = "No";
        if (cell.data) {
            boolValue = "Yes";
        }
        return boolValue;
    }
    GetAddress(row) {
        let address = '';
        address = `${row.cells[4].data}, `;
        if (row.cells[5].data != null) {
            address += `${row.cells[5].data}, `;
        }
        address += `${row.cells[6].data}, ${row.cells[7].data}, ${row.cells[8].data}`;
        return address;
    }
    GetSwitch(row, cell, caption) {
        if (this._userRole != "Administrator") {
            return `<b>${caption}:</b> ${this.GetYesNo(cell)}<br/>`;
        }
        let boolValue = "";
        if (cell.data) {
            boolValue = "checked";
        }
        let id = caption.replace(" ", "-");
        let className = id;
        let roomIndex = 1;
        if (caption == "Approved Space") {
            roomIndex = 0;
            id = `${id}-${row.cells[1].data}`;
        }
        return `<div class="form-check form-switch">
          <input class="form-check-input ${className}" type="checkbox" id="${id}-${row.cells[roomIndex].data}" ${boolValue}/>
          <label class="form-check-label" for="${id}-${row.cells[roomIndex].data}">${caption}</label>
        </div>`;
    }
    UpdateApprovedSpaceStatus(controlId, approved) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = controlId.split("-")[3];
            let response = yield this._httpManager.putJson(`${this._hostServiceUrl}/v1/Space/VenueApprovedStatus/${id}?approved=${approved}`, "");
            if (response.ok) {
                //debugger;
                //var toast = document.getElementById('ToastMessage')
                //var tostInstance = bootstrap.Toast.getInstance(toast)
                //tostInstance.show();
                alert("Status Set Sucessfully!");
            }
            else {
                alert("Faild to Set the Status!");
            }
        });
    }
    UpdateApprovedRoomStatus(controlId, approved) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = controlId.split("-")[2];
            let response = yield this._httpManager.putJson(`${this._hostServiceUrl}/v1/room/RoomApprovedStatus/${id}?approved=${approved}`, "");
            if (response.ok) {
                alert("Status Set Sucessfully!");
            }
            else {
                alert("Faild to Set the Status!");
            }
        });
    }
    UpdateActiveRoomStatus(controlId, active) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = controlId.split("-")[2];
            let response = yield this._httpManager.putJson(`${this._hostServiceUrl}/v1/room/RoomActiveStatus/${id}?active=${active}`, "");
            if (response.ok) {
                alert("Status Set Sucessfully!");
            }
            else {
                alert("Faild to Set the Status!");
            }
        });
    }
    DeleteRoom(controlId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (confirm("Would you like to delete the selected room?")) {
                let id = controlId.split("-")[2];
                let response = yield this._httpManager.deleteJson(`${this._hostServiceUrl}/v1/room/Delete/${id}`, "");
                if (response.ok) {
                    alert("Deleted Sucessfully!");
                }
                else {
                    alert("Faild to Delete!");
                }
            }
        });
    }
    GetRatings(row) {
        let starReview = "";
        let review = row.cells[20].data;
        let averageRating = row.cells[21].data;
        if (review > 0) {
            if (averageRating >= 1) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 2) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 3) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 4) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating == 5) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            starReview = `${starReview}&nbsp;&nbsp;${averageRating}/5&nbsp;(${review} reviews)`;
            return starReview;
        }
        else {
            return "Not Rated";
        }
    }
    GetAmenities(row) {
        let amenities = "";
        if (row.cells[22].data) {
            amenities += `<i class="fas fa-wifi mx-2" title="Wifi Provided"></i>`;
        }
        if (row.cells[23].data) {
            amenities += `<i class="fas fa-smoking mx-2" title="Smooking Allowed"></i>`;
        }
        if (row.cells[24].data) {
            amenities += `<i class="fas fa-utensils mx-2" title="In-house Cateroing Allowed"></i>`;
        }
        if (row.cells[25].data) {
            amenities += `<i class="fab fa-accessible-icon mx-2" title="ADA Accecible"></i>`;
        }
        if (row.cells[26].data) {
            amenities += `<i class="fas fa-percent mx-2" title="Government Discount Allowed"></i>`;
        }
        if (amenities == "") {
            return "No Amenities";
        }
        return amenities;
    }
    GetCard(host, row) {
        //&nbsp;<a href="#" id="delete-room-${row.cells[1].data}" class="btn btn-danger btn-sm delete-room" title="Delete Room"><i class="fas fa-trash-alt"></i></a>
        return `<div class="card mb-3" style="width:100%;z-index:1;">
  <div class="row g-0">
    <div class="col-md-3 p-4">
      <a href="${host}${row.cells[16].data}" target="_new"><img src="${host}/Image/${row.cells[15].data}" class="rounded float-start responsive" style="max-height: 220px;" title="${row.cells[3].data}" alt="${row.cells[3].data}"></a>
    </div>
    <div class="col-md-7">
      <div class="card-body">
        <table style="width:100%;" class="table table-sm table-borderless">
            <tr class="fs-5"><td class="fw-bold text-end">Room Name:</td><td>${row.cells[3].data}</td><td><a href="${host}${row.cells[16].data}" target="_new" class="btn btn-success btn-sm" title="View"><i class="fas fa-eye"></i></a>&nbsp;<a href="${host}/admin/room/addedit/${row.cells[0].data}/${row.cells[1].data}" class="btn btn-primary btn-sm" title="Edit Room"><i class="far fa-edit"></i></a>&nbsp;<a href="${host}/admin/room/addedit/${row.cells[0].data}/0" class="btn btn-info btn-sm" title="Add Room"><i class="fas fa-plus-circle"></i></a></td></tr>
            <tr><td class="fw-bold text-end">Room Type:</td><td>${row.cells[18].data}</td><td></td></tr>
            <tr><td class="fw-bold text-end">Venue Name:</td><td>${row.cells[2].data}</td><td><a href="${host}/admin/venue/addedit/${row.cells[0].data}" class="btn btn-primary btn-sm"><i class="far fa-edit"></i> Edit Venue</a></td></tr>
            <tr><td class="fw-bold text-end">Venue Type:</td><td>${row.cells[19].data}</td><td></td></tr>
            <tr><td class="fw-bold text-end">Address:</td><td colspan="2">${this.GetAddress(row)}</td></tr>
            <tr><td class="fw-bold text-end">Reviews:</td><td colspan="2">${this.GetRatings(row)}</td></tr>
            <tr><td class="fw-bold text-end">Amenities:</td><td colspan="2">${this.GetAmenities(row)}</td></tr>
        </table>
      </div>
    </div>
    <div class="col-md-2">
<div class="card-body">
        <p class="card-text text-uppercase" title="Maximum Capacity"><b>Capacity: </b><i class="fas fa-users"></i> &nbsp; ${row.cells[17].data}</p>
        <p class="card-text text-uppercase"><b>Daily Rate: </b>$${row.cells[9].data.toLocaleString()}/Day<br/><b>Hourly Rate: </b>$${row.cells[10].data.toLocaleString()}/Hr</p>
        <p class="card-text">${this._userRole == "Administrator" ? this.GetSwitch(row, row.cells[13], "Approved Space") : ""}${this.GetSwitch(row, row.cells[12], "Approved Room")}${this.GetSwitch(row, row.cells[11], "Active Room")}</p>
      </div>
</div>
  </div>
<span class="position-absolute top-0 start-0 translate-middle p-2 badge rounded-pill bg-info text-dark">${row.cells[1].data}</span>
</div>`;
    }
    Search() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager.Search();
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new VenueAdminManager();
    yield page.InitGrid();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1,2], () => (__webpack_exec__(49)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=venueAdmin.js.map