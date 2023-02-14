(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[8],{

/***/ 55:
/*!*******************************************!*\
  !*** ./Client/Pages/Admin/ReviewAdmin.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReviewAdminManager": () => (/* binding */ ReviewAdminManager)
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




class ReviewAdminManager {
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
            gridSetting.SearchFields = ["Search_SpaceName", "Search_ReviewerName", "Search_ReviewDate", "Search_Rating"];
            gridSetting.SearchUrl = `${this._hostUrl}/admin/review?handler=Search`;
            gridSetting.CreateUrl = `${this._hostUrl}/admin/review?handler=Create`;
            gridSetting.EditUrl = `${this._hostUrl}/admin/review?handler=Update`;
            gridSetting.DeleteUrl = `${this._hostUrl}/admin/review?handler=Delete`;
            gridSetting.Columns = [
                { id: "ReviewId", name: "", sort: false, formatter: (cell, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_3__.html)(this.GetCard(this._hostUrl, row)) },
                { id: "SpaceId", name: "Space Id", sort: false, hidden: true },
                { id: "SpaceName", name: "Space Name", hidden: true },
                { id: "ReviewDate", name: "Review Date", sort: true, hidden: true },
                { id: "Text", name: "Text", hidden: true },
                { id: "Rating", name: "Rating", hidden: true },
                { id: "ReviewerName", name: "Reviewer Name", hidden: true },
                { id: "Email", name: "Reviewer Email", hidden: true },
            ];
            this._gridManager.Init(gridSetting);
            this._gridManager.DataGrid.on('ready', () => __awaiter(this, void 0, void 0, function* () { return (this.InitEvents()); }));
        });
    }
    InitEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            //let deleteReviewElements = document.getElementsByClassName("btn btn-danger btn-sm delete-review");
            //for (let element of Array.from(deleteReviewElements)) {
            //    element.addEventListener("click", async (e: Event) => this.DeleteReview(element.id))
            //}
            let paginationText = document.getElementsByClassName("gridjs-summary");
            const ths = document.querySelectorAll('th[data-column-id]');
            ths[0].innerText = paginationText[0].innerText;
        });
    }
    DeleteReview(controlId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (confirm("Would you like to delete the selected room?")) {
                let id = controlId.split("-")[2];
                let response = yield this._httpManager.deleteJson(`${this._hostServiceUrl}/v1/review/Delete/${id}`, "");
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
        let review = row.cells[5].data;
        if (review > 0) {
            if (review == 1) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (review == 2) {
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (review == 3) {
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (review == 4) {
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (review == 5) {
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
                starReview += `<i class="fas fa-star"></i>`;
            }
            return starReview;
        }
        else {
            return "Not Rated";
        }
    }
    GetCard(host, row) {
        var _a;
        return `<div class="card mb-3" style="width:100%;z-index:1;">
  <div class="row g-0">
    <div class="col-md-12">
      <div class="card-body">
        <p><b>Venue Name:</b> ${row.cells[2].data} ${this.GetRatings(row)}</p>
        <p><b>Posted By:</b> <a href="mailto:${(_a = row.cells[7].data) !== null && _a !== void 0 ? _a : "#"}"> ${row.cells[6].data}</a> <b>on</b> ${this._uiHelper.GetDateString(row.cells[3].data)}</p>
        <p>${row.cells[4].data}</p>
      </div>
    </div>
</div>
</div>`;
    }
    Search() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager.Search();
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new ReviewAdminManager();
    yield page.InitGrid();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1,2], () => (__webpack_exec__(55)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=reviewAdmin.js.map