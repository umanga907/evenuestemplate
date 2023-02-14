(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[11],{

/***/ 62:
/*!***************************************!*\
  !*** ./Client/Pages/InquiryStatus.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InquiryStatusManager": () => (/* binding */ InquiryStatusManager)
/* harmony export */ });
/* harmony import */ var _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/FormManager */ 1);
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/UiHelper */ 0);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class InquiryStatusManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let submitButton = document.getElementById("submitButton");
            if (submitButton !== null) {
                submitButton.addEventListener("click", (e) => this.Save());
            }
        });
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('InquiryStatusForm');
            if (yield formManager.ValidateForm()) {
                let url = `${window.location.href}`;
                let response = yield formManager.SubmitForm(url);
                if (response.ok) {
                    let successMessage = `<div class="alert alert-success"><b>ORDER COMPLETE!</b></div><hr class="my-4"> <h1 class="h3">Thank You!</h1><p>${response.data}</p>`;
                    let headerMessagElement = document.getElementById('HeaderAlertMessage');
                    if (headerMessagElement !== null) {
                        headerMessagElement.innerHTML = successMessage;
                        headerMessagElement.style.display = 'block';
                    }
                    let formElement = document.getElementById('InquirySubmitDiv');
                    if (formElement !== null) {
                        formElement.style.display = 'none';
                    }
                }
                else {
                    yield formManager.ShowSuccessFailureMessage(response);
                }
            }
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new InquiryStatusManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(62)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=inquiryStatus.js.map