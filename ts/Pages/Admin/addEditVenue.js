(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[4],{

/***/ 50:
/*!********************************************!*\
  !*** ./Client/Pages/Admin/AddEditVenue.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AddEditVenueManager": () => (/* binding */ AddEditVenueManager)
/* harmony export */ });
/* harmony import */ var _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/FormManager */ 1);
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/UiHelper */ 0);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class AddEditVenueManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let saveButton = document.getElementById("saveButton");
            if (saveButton !== null) {
                saveButton.addEventListener("click", (e) => this.Save());
            }
            let cancelButton = document.getElementById("cancelButton");
            if (cancelButton !== null) {
                cancelButton.addEventListener("click", (e) => this.Cancel());
            }
        });
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('venueEditorForm');
            if (yield formManager.ValidateForm()) {
                let response = yield formManager.SubmitForm();
                if (response.ok) {
                    let host = document.getElementById("HostName");
                    let role = document.getElementById("Role");
                    if (host != null) {
                        if (role.value.toLowerCase() === "provider") {
                            window.location.href = `${host.value}/admin/provider/venue`;
                        }
                        else {
                            window.location.href = `${host.value}/admin/venue`;
                        }
                    }
                    else {
                        alert('Host Name is not configured');
                    }
                }
                else {
                    yield formManager.ShowSuccessFailureMessage(response);
                }
            }
        });
    }
    Cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            let host = document.getElementById("HostName");
            let role = document.getElementById("Role");
            if (host != null) {
                if (role.value.toLowerCase() === "provider") {
                    window.location.href = `${host.value}/admin/provider/venue`;
                }
                else {
                    window.location.href = `${host.value}/admin/venue`;
                }
            }
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new AddEditVenueManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(50)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=addEditVenue.js.map