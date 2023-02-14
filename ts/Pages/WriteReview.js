(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[10],{

/***/ 63:
/*!*************************************!*\
  !*** ./Client/Pages/WriteReview.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WriteReviewManager": () => (/* binding */ WriteReviewManager)
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


class WriteReviewManager {
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
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('WriteReviewForm');
            if (yield formManager.ValidateForm()) {
                let recaptchaSiteKey = document.getElementById('ReviewView_ReCaptchaSiteKey');
                yield grecaptcha.execute(recaptchaSiteKey.value, { action: 'WriteReview' }).then(function (token) {
                    let captcha = document.getElementById('ReviewView_ReCaptcha');
                    captcha.value = token;
                });
                let url = `${window.location.href}`;
                let response = yield formManager.SubmitForm(url);
                if (response.ok) {
                    let headerMessagElement = document.getElementById('HeaderAlertMessage');
                    if (headerMessagElement !== null) {
                        headerMessagElement.innerText = response.data;
                        headerMessagElement.style.display = 'block';
                    }
                    let formElement = document.getElementById('WriteReviewDiv');
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
    let page = new WriteReviewManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(63)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=WriteReview.js.map