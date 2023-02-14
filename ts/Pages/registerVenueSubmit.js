(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[15],{

/***/ 60:
/*!*********************************************!*\
  !*** ./Client/Pages/RegisterVenueSubmit.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterVenueSubmitManager": () => (/* binding */ RegisterVenueSubmitManager)
/* harmony export */ });
/* harmony import */ var _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/FormManager */ 1);
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/UiHelper */ 0);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bootstrap */ 19);
/* harmony import */ var bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bootstrap__WEBPACK_IMPORTED_MODULE_2__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class RegisterVenueSubmitManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let backButton = document.getElementById("submitVenueRegistrationPrevButton");
            if (backButton !== null) {
                backButton.addEventListener("click", (e) => this.Save(2));
            }
            let nextButton = document.getElementById("submitVenueRegistrationButton");
            if (nextButton !== null) {
                nextButton.addEventListener("click", (e) => this.Save(4));
            }
            let step1Tab = document.getElementById("step1Tab");
            if (step1Tab !== null) {
                step1Tab.addEventListener("click", (e) => this.Save(1));
            }
            let step2Tab = document.getElementById("step2Tab");
            if (step2Tab !== null) {
                step2Tab.addEventListener("click", (e) => this.Save(2));
            }
            let printLicense = document.getElementById("PrintLink");
            if (printLicense !== null) {
                printLicense.addEventListener("click", (e) => this.PrintTextArea());
            }
        });
    }
    Save(step) {
        return __awaiter(this, void 0, void 0, function* () {
            if (step == 1 || step == 2) {
                let host = document.getElementById("HostName");
                if (host != null) {
                    let spaceHidden = document.getElementById("VenueRegisterView_SpaceId");
                    let roomHidden = document.getElementById("VenueRegisterView_RoomId");
                    window.location.href = `${host.value}/meeting-space/register/${step}/${spaceHidden.value}/${roomHidden.value}`;
                }
                return;
            }
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('venueConfirmationForm');
            if (yield formManager.ValidateForm()) {
                let response = yield formManager.SubmitForm();
                if (response.ok) {
                    var confirmModel = document.getElementById('staticBackdrop');
                    var modal = new bootstrap__WEBPACK_IMPORTED_MODULE_2__.Modal(confirmModel);
                    modal.show();
                }
                else {
                    yield formManager.ShowSuccessFailureMessage(response);
                }
            }
        });
    }
    PrintTextArea() {
        return __awaiter(this, void 0, void 0, function* () {
            let textArea = document.getElementById('AgreementTextArea');
            let childWindow = window.open('', 'childWindow', 'location=yes, menubar=yes, toolbar=yes');
            childWindow.document.open();
            childWindow.document.write('<html><head></head><body>');
            childWindow.document.write(textArea.value.replace(/\n/gi, '<br>'));
            childWindow.document.write('</body></html>');
            childWindow.print();
            childWindow.document.close();
            childWindow.close();
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new RegisterVenueSubmitManager();
    yield page.Init();
}));


/***/ }),

/***/ 19:
/*!****************************!*\
  !*** external "bootstrap" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = bootstrap;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(60)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=registerVenueSubmit.js.map