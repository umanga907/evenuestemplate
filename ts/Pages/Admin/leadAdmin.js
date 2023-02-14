(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[5],{

/***/ 54:
/*!*****************************************!*\
  !*** ./Client/Pages/Admin/LeadAdmin.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LeadAdminManager": () => (/* binding */ LeadAdminManager)
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




class LeadAdminManager {
    constructor() {
        this._userRole = "";
    }
    InitGrid() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager = new _Common_GridManager__WEBPACK_IMPORTED_MODULE_2__.GridManager();
            this._uiHelper = new _Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__.UiHelper();
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
            gridSetting.SearchFields = ["Search_FromDate", "Search_ToDate", "Search_LeadStatus", "Search_Common"];
            gridSetting.SearchUrl = `${this._hostUrl}/admin/lead?handler=Search`;
            gridSetting.CreateUrl = `${this._hostUrl}/admin/lead?handler=Create`;
            gridSetting.EditUrl = `${this._hostUrl}/admin/lead?handler=Update`;
            gridSetting.DeleteUrl = `${this._hostUrl}//admin/lead?handler=Delete`;
            gridSetting.Columns = [
                { id: "LeadId", name: "", sort: false, formatter: (cell, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_3__.html)(this.GetCard(this._hostUrl, row)) },
                { id: "LeadWorkItemId", name: "Lead Work ItemId", sort: false, hidden: true },
                { id: "RoomId", name: "RoomId", hidden: true },
                { id: "SpaceId", name: "SpaceId", sort: true, hidden: true },
                { id: "SpaceName", name: "Space Name", hidden: true },
                { id: "RoomName", name: "RoomName", hidden: true },
                { id: "SpaceCity", name: "SpaceCity", hidden: true },
                { id: "SpaceState", name: "SpaceState", hidden: true },
                { id: "FirstName", name: "FirstName", hidden: true },
                { id: "LastName", name: "LastName", hidden: true },
                { id: "CustomerEmail", name: "CustomerEmail", hidden: true },
                { id: "CustomerCity", name: "CustomerCity", hidden: true },
                { id: "CustomerState", name: "CustomerState", hidden: true },
                { id: "Organization", name: "Organization", hidden: true },
                { id: "LeadStatus", name: "LeadStatus", hidden: true },
                { id: "LeadResultType", name: "LeadResultType", hidden: true },
                { id: "EventDate", name: "EventDate", hidden: true },
                { id: "EventStartTime", name: "EventStartTime", hidden: true },
                { id: "EventFinishTime", name: "EventFinishTime", sort: true, hidden: true },
                { id: "DateIsFlexible", name: "DateIsFlexible", sort: true, hidden: true },
                { id: "NumberGuests", name: "NumberGuests", sort: true, hidden: true },
                { id: "TotalBudget", name: "TotalBudget", hidden: true },
                { id: "RentalAmount", name: "RentalAmount", hidden: true },
                { id: "VenueEnteredPrice", name: "VenueEnteredPrice", hidden: true },
                { id: "CustomerEnteredPrice", name: "CustomerEnteredPrice", hidden: true },
                { id: "ActualRentalPaidAmt", name: "ActualRentalPaidAmt", hidden: true },
                { id: "Fee", name: "Fee", hidden: true },
                { id: "LateFee", name: "LateFee", hidden: true },
                { id: "MaxFee", name: "MaxFee", hidden: true },
                { id: "InvoiceAmt", name: "InvoiceAmt", hidden: true },
                { id: "InvoiceDisplayNumber", name: "InvoiceDisplayNumber", hidden: true },
                { id: "InvoiceNumber", name: "InvoiceNumber", hidden: true },
                { id: "DateCreated", name: "DateCreated", hidden: true },
                { id: "DateBooked", name: "DateBooked", hidden: true },
                { id: "DateAcceptedRejected", name: "DateAcceptedRejected", hidden: true },
                { id: "DateClosed", name: "DateClosed", hidden: true },
                { id: "VenueResultTypes", name: "VenueResultTypes", hidden: true },
                { id: "CustomerResultTypes", name: "CustomerResultTypes", hidden: true },
                { id: "AdminNotes", name: "AdminNotes", hidden: true },
                { id: "CustomerNotes", name: "CustomerNotes", hidden: true },
                { id: "LeadType", name: "LeadType", hidden: true },
                { id: "MeetingType", name: "MeetingType", hidden: true },
                { id: "ApprovalGuid", name: "ApprovalGuid", hidden: true },
                { id: "RoomSlug", name: "RoomSlug", hidden: true },
            ];
            this._gridManager.Init(gridSetting);
            this._gridManager.DataGrid.on('ready', () => __awaiter(this, void 0, void 0, function* () { return (this.InitEvents()); }));
        });
    }
    InitEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            let paginationText = document.getElementsByClassName("gridjs-summary");
            const ths = document.querySelectorAll('th[data-column-id]');
            ths[0].innerText = paginationText[0].innerText;
        });
    }
    GetYesNo(cell) {
        let boolValue = "No";
        if (cell.data) {
            boolValue = "Yes";
        }
        return boolValue;
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
    GetInquirySummary(host, row) {
        var _a, _b;
        return `<table class="table table-sm table-bordered table-striped">
             <thead>
                <tr class="bg-primary text-white">
                  <th scope="col" colspan="2">Lead Information</th>
                </tr>
              </thead>
            <tbody>
            <tr>
                <td width="40%"><b>Status:</b></td>
                    <td><a href="${host}/LeadApproval/Index/${row.cells[1].data}/${row.cells[42].data}/Accept" target="_new">${row.cells[14].data}</a></td>
                </tr>
                <tr>
                    <td width="40%"><b>Result:</b></td>
                    <td>${(_a = row.cells[15].data) !== null && _a !== void 0 ? _a : "NA"}</td>
                </tr>
                <tr>
                    <td width="40%"><b>Customer:</b></td>
                    <td>${row.cells[8].data} ${row.cells[9].data}</td>
                </tr>
                <tr>
                    <td width="40%"><b>Venue Requested:</b></td>
                    <td>${row.cells[4].data}</td>
                </tr>
                <tr>
                    <td width="40%"><b>Room Requested:</b></td>
                    <td><a href="${host}${row.cells[43].data}" target="_new">${row.cells[5].data}</a></td>
                </tr>
                <tr>
                    <td width="40%"><b>Created Date:</b></td>
                    <td>${this._uiHelper.GetDateString(row.cells[32].data)}</td>
                </tr>
                <tr>
                    <td width="40%"><b>Event Date & Time:</b></td>
                    <td>${this._uiHelper.GetDateString(row.cells[16].data)} ${row.cells[17].data} - ${row.cells[18].data}</td>
                </tr>
                <tr>
                    <td><b>Dates are Flexible:</b></td>
                    <td>${this.GetYesNo(row.cells[19])}</td>
                </tr>
                <tr>
                    <td><b>Number of Guests:</b></td>
                    <td>${row.cells[20].data}</td>
                </tr>
                <tr>
                    <td><b>Company Name:</b></td>
                    <td>${row.cells[13].data}</td>
                </tr>
               
                <tr>
                    <td><b>Event Type:</b></td>
                    <td>${row.cells[41].data}</td>
                </tr>
                <tr>
                    <td colspan="2"><b>Customer Notes:</b> ${(_b = row.cells[39].data) !== null && _b !== void 0 ? _b : "NA"}</td>
                </tr>
            </tbody>
        </table>`;
    }
    GetSaleSummary(host, row) {
        var _a;
        let rentalTable = `<table class="table table-sm table-bordered table-striped">
             <thead>
                <tr class="bg-success text-white">
                  <th scope="col" colspan="2">Rental Information</th>
                </tr>
              </thead>
            <tbody>
                 <tr>
                    <td><b>Total Budget:</b></td>
                    <td>${row.cells[20].data == 0 ? "Negotiable" : "$" + row.cells[20].data.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><b>Rental Amount:</b></td>
                    <td>$${row.cells[21].data.toFixed(2)}</td>
                </tr>`;
        if (this._userRole == "Administrator") {
            rentalTable += `<tr>
                    <td><b>Venue Said Price:</b></td>
                    <td>$${row.cells[23].data.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><b>Customer Said Price:</b></td>
                    <td>$${row.cells[24].data.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><b>Actual Rent Paid:</b></td>
                    <td>$${row.cells[25].data.toFixed(2)}</td>
                </tr>
               <tr>
                    <td><b>Fee:</b></td>
                    <td>$${row.cells[26].data.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><b>Late Fee:</b></td>
                    <td>$${row.cells[27].data.toFixed(2)}</td>
                </tr>
                <tr>
                    <td><b>Invoice Amount:</b></td>
                    <td>$${row.cells[29].data.toFixed(2)}</td>
                </tr>`;
        }
        rentalTable += `<tr>
                    <td><b>Invoice #:</b></td>
                    <td>${(_a = row.cells[30].data) !== null && _a !== void 0 ? _a : "-"}</td>
                </tr>
            </tbody>
        </table>`;
        return rentalTable;
    }
    GetCard(host, row) {
        return `<div class="card" style="width:100%;z-index:1;">
  <div class="row p-3">
        <div class="col-md-6">
            ${this.GetInquirySummary(host, row)}
        </div>
        <div class="col-md-6">
            ${this.GetSaleSummary(host, row)}
        </div>
  </div>
<span class="position-absolute top-0 start-0 translate-middle p-2 badge rounded-pill bg-info text-dark">${row.cells[0].data}</span>
</div>`;
    }
    Search() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager.Search();
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new LeadAdminManager();
    yield page.InitGrid();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1,2], () => (__webpack_exec__(54)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=leadAdmin.js.map