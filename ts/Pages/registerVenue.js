(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[14],{

/***/ 58:
/*!***************************************!*\
  !*** ./Client/Pages/RegisterVenue.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterVenueManager": () => (/* binding */ RegisterVenueManager)
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


class RegisterVenueManager {
    Init() {
        return __awaiter(this, void 0, void 0, function* () {
            let nextButton = document.getElementById("registerVenueSubmitButton");
            if (nextButton !== null) {
                nextButton.addEventListener("click", (e) => this.Save());
            }
            //let step2Tab = document.getElementById("step2Tab") as HTMLLIElement;
            //if (step2Tab !== null) {
            //    step2Tab.addEventListener("click", (e: Event) => this.Save());
            //}
            //let step3Tab = document.getElementById("step3Tab") as HTMLLIElement;
            //if (step3Tab !== null) {
            //    step3Tab.addEventListener("click", (e: Event) => this.Save());
            //}
        });
    }
    Save() {
        return __awaiter(this, void 0, void 0, function* () {
            let formManager = new _Common_FormManager__WEBPACK_IMPORTED_MODULE_0__.FormManager('venueEditorForm');
            if (yield formManager.ValidateForm()) {
                let response = yield formManager.SubmitForm();
                if (response.ok) {
                    let host = document.getElementById("HostName");
                    if (host != null) {
                        let data = JSON.parse(response.data);
                        window.location.href = `${host.value}/meeting-space/register/2/${data.SpaceId}/${data.RoomId}`;
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
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_1__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new RegisterVenueManager();
    yield page.Init();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1], () => (__webpack_exec__(58)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=registerVenue.js.map