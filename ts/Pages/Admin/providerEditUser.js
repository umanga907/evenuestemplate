(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[6],{

/***/ 52:
/*!************************************************!*\
  !*** ./Client/Pages/Admin/ProviderEditUser.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProviderEditUserManager": () => (/* binding */ ProviderEditUserManager)
/* harmony export */ });
/* harmony import */ var _Common_HttpManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Common/HttpManager */ 13);
/* harmony import */ var _Common_FormManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Common/FormManager */ 1);
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../Common/UiHelper */ 0);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class ProviderEditUserManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let saveButton = document.getElementById("saveButton");
            if (saveButton !== null) {
                saveButton.addEventListener("click", (e) => this.Save());
            }
            let updateLoginEmailButton = document.getElementById("updateLoginEmailButton");
            if (updateLoginEmailButton !== null) {
                updateLoginEmailButton.addEventListener("click", (e) => this.UpdateEmail(e));
            }
            let accessToken = document.getElementById("AccessToken");
            this._httpManager = new _Common_HttpManager__WEBPACK_IMPORTED_MODULE_0__.HttpManager(accessToken.value);
            let hostService = document.getElementById("HostServiceUrl");
            this._hostServiceUrl = hostService.value;
        });
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_1__.FormManager('userEditorForm');
            if (yield formManager.ValidateForm()) {
                let response = yield formManager.SubmitForm();
                if (response.ok) {
                    alert('Users & Passwords updated successfully!');
                    window.location.reload();
                }
                else {
                    yield formManager.ShowSuccessFailureMessage(response);
                }
            }
        });
    }
    UpdateEmail(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let email = document.getElementById("UserAddEditModel_LoginContactEmail");
            if (email.value === undefined || email.value === '' || email.value === null) {
                alert("Please enter a valid email address");
                return;
            }
            let password = document.getElementById("UserAddEditModel_LoginContactPassword");
            if (password.value === undefined || password.value === '' || password.value === null) {
                alert("Please enter a valid New Passwrod");
                return;
            }
            let confirmPassword = document.getElementById("UserAddEditModel_LoginContactConfirmPassword");
            if (confirmPassword.value === undefined || confirmPassword.value === '' || confirmPassword.value === null) {
                alert("Please enter a valid Confirm Passwrod");
                return;
            }
            if (password.value !== confirmPassword.value) {
                alert("Please enter a valid Confirm Passwrod");
                return;
            }
            let spaceId = document.getElementById("UserAddEditModel_SpaceId");
            let response = yield this._httpManager.postJson(`${this._hostServiceUrl}/v1/account/updateLoginEmail?spaceId=${spaceId.value}&email=${email.value}&password=${password.value}`, ``);
            if (response.ok) {
                alert("Login email updated sucessfully!");
                window.location.reload();
            }
            else {
                alert(response.data.Message);
            }
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_2__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new ProviderEditUserManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(52)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=providerEditUser.js.map