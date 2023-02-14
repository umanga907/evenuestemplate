(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[17],{

/***/ 57:
/*!**************************************!*\
  !*** ./Client/Pages/VenueProfile.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VenueProfileManager": () => (/* binding */ VenueProfileManager)
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


class VenueProfileManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let submitButton = document.getElementById("submitInquiryButton");
            if (submitButton !== null) {
                submitButton.addEventListener("click", (e) => this.Save());
            }
            let availabilityDate = document.getElementById("AvailabilityDate");
            if (availabilityDate !== null) {
                availabilityDate.addEventListener("change", (e) => this.UpdateDesiredDate(availabilityDate.value));
            }
        });
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('InquiryForm');
            if (yield formManager.ValidateForm()) {
                let recaptchaSiteKey = document.getElementById('VenueProfileView_InquiryView_ReCaptchaSiteKey');
                yield grecaptcha.execute(recaptchaSiteKey.value, { action: 'VenueProfile' }).then(function (token) {
                    let captcha = document.getElementById('VenueProfileView_InquiryView_ReCaptcha');
                    captcha.value = token;
                });
                let url = `${window.location.href}VenueProfile`;
                let response = yield formManager.SubmitForm(url);
                if (response.ok) {
                    let host = document.getElementById("HostName");
                    if (host != null) {
                        let inquirySummaryUrl = `${host.value}/InquirySummary/${response.data}`;
                        window.location.href = inquirySummaryUrl;
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
    UpdateDesiredDate(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let desiredDate = document.getElementById("VenueProfileView_InquiryView_PreferredMeetingDate");
            if (desiredDate !== null) {
                desiredDate.value = value;
            }
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new VenueProfileManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(57)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=venueProfile.js.map