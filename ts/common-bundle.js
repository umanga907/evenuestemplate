(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[1],{

/***/ 1:
/*!**************************************!*\
  !*** ./Client/Common/FormManager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormManager": () => (/* binding */ FormManager)
/* harmony export */ });
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProgressBar */ 31);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/*import $ from 'jquery';*/
class FormResponse extends Response {
}
class FormManager {
    constructor(formId, validClass = "is-valid", invalidClass = "is-invalid") {
        this._validationRequiredMessageAttribute = 'data-val-required'; //The ${FirstName} field is required.
        this._validationMaxLengthMessageAttribute = 'data-val-maxlength'; //The field ${FirstName} must be a string or array type with a maximum length of '20'.
        //private _validationMaxLengthValueAttribute: string = 'data-val-maxlength-max';//20
        this._validationPhoneMessageAttribute = 'data-val-phone'; //The ${Phone} field is not a valid phone number.
        this._validationEmailMessageAttribute = 'data-val-email'; //The ${EmailAddress} field is not a valid e-mail address.
        this._validationNumberMessageAttribute = 'data-val-range'; //The field Number of Days must be between 1 and 10000.
        this._validationNumberMinRangeAttribute = 'data-val-range-min'; //1
        this._validationNumberMaxRangeAttribute = 'data-val-range-max'; //1000
        this._validationIntegerMessageAttribute = 'data-val-integer'; //The ${Integer} field is not a valid integer.
        this._validationFieldLabelAttribute = 'data-val-field-label';
        this._antiforgeryTokenHeaderName = '__RequestVerificationToken';
        this._headerAlertMessageName = 'HeaderAlertMessage';
        this._form = document.getElementById(formId);
        if (this._form === null) {
            throw Error(`Form with Id ${formId} is not found`);
        }
        this._validClass = validClass;
        this._invalidClass = invalidClass;
        this.HideAllValidationMessages();
    }
    HideAllValidationMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            let validationElement = document.getElementsByClassName(this._invalidClass)[0];
            if (validationElement !== undefined) {
                validationElement.classList.remove(this._invalidClass);
                validationElement.classList.add(this._validClass);
            }
            let headerMessagElement = document.getElementById(this._headerAlertMessageName);
            if (headerMessagElement !== null) {
                headerMessagElement.innerText = '';
                headerMessagElement.style.display = 'none';
            }
        });
    }
    ValidateForm() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.HideAllValidationMessages();
            let formValid = true;
            //await this.RemoveAllValidationSpans();
            let elements = Array.from(this._form.elements);
            for (let element of elements) {
                let input = element;
                if (input.type === 'button') {
                    continue;
                }
                let controlDisplayText = input.id;
                let valFieldLabel = input.attributes.getNamedItem(this._validationFieldLabelAttribute);
                if (valFieldLabel !== null) {
                    controlDisplayText = valFieldLabel.value;
                }
                yield this.ValidateInputForRequired(input);
                if (!formValid) {
                    continue;
                }
                yield this.ValidateInputForMaxLength(input, controlDisplayText);
                if (!formValid) {
                    continue;
                }
                switch (input.type) {
                    case 'email':
                        formValid = yield this.ValidateEmailInput(input);
                        break;
                    case 'tel':
                        formValid = yield this.ValidatePhoneInput(input);
                        break;
                    case 'number':
                        formValid = yield this.ValidateNumberInput(input);
                        break;
                }
                if (!formValid) {
                    continue;
                }
            }
            return formValid;
        });
    }
    SubmitForm(url = '', method = 'post', antiforgeryToken = '') {
        return __awaiter(this, void 0, void 0, function* () {
            if (url == undefined || url === '') {
                url = this._form.attributes.getNamedItem('action').value;
            }
            let headers = [];
            if (antiforgeryToken !== '') {
                headers.push([this._antiforgeryTokenHeaderName, antiforgeryToken]);
            }
            let formData = new FormData(this._form);
            let request = { method: method, body: formData, headers: headers };
            let progressBar = new _ProgressBar__WEBPACK_IMPORTED_MODULE_0__.ProgressBar();
            progressBar.show('Saving...');
            try {
                const response = yield fetch(url, request);
                progressBar.hide();
                response.data = yield response.text();
                return response;
            }
            catch (ex) {
                progressBar.hide();
                throw Error(`Error occurred while deserialize the Form Response to JSON : ${ex}`);
            }
        });
    }
    HandleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
    ShowSuccessFailureMessage(response, sucessMessage = 'Data is saved successfully!', errorMessage = 'An error has been occurred while saving the data.') {
        return __awaiter(this, void 0, void 0, function* () {
            let alertDiv = document.getElementById(this._headerAlertMessageName);
            if (alertDiv === null) {
                let childerns = this._form.children;
                let alertDivExists = false;
                for (let element of Array.from(childerns)) {
                    if (element.id === this._headerAlertMessageName) {
                        alertDivExists = true;
                        break;
                    }
                }
                if (!alertDivExists) {
                    let divItem = document.createElement("div");
                    divItem.id = this._headerAlertMessageName;
                    this._form.insertBefore(divItem, this._form.firstChild);
                    alertDiv = document.getElementById(this._headerAlertMessageName);
                }
            }
            let message = '';
            let alertStyle = 'alert-warning';
            if (alertDiv !== null) {
                alertDiv.style.display = 'visible';
                if (response.ok) {
                    message = sucessMessage;
                    alertStyle = 'alert-success';
                }
                else {
                    let data = yield response.data;
                    if (response.status == 500) {
                        message = `${errorMessage}:<br/> ${response.status}: ${data}`;
                        alertStyle = 'alert-danger';
                    }
                    else { //Model State Validation Error
                        //message += `Please correct the following validation errors:<ul>`;
                        try {
                            let errors = JSON.parse(data);
                            if (errors === undefined) {
                                message += yield this.GetErrorMessage(data[0]);
                            }
                            else {
                                for (var key in errors) {
                                    if (errors.hasOwnProperty(key)) {
                                        message += yield this.GetErrorMessage(errors[key]);
                                    }
                                }
                            }
                        }
                        catch (ex) {
                            message += yield this.GetErrorMessage(data[0]);
                        }
                        if (message.length > 0) {
                            message = `Please correct the following validation errors: <ul>${message}</ul>`;
                        }
                        else {
                            message = `Please correct the following validation errors`;
                        }
                        alertStyle = 'alert-warning';
                    }
                }
                alertDiv.style.display = 'block';
            }
            else {
                if (response.ok) {
                    alert('Saved Sucessfully');
                }
                else {
                    alert(`An error occured: ${response.status}: ${response.statusText}`);
                }
                return;
            }
            let template = `<div class="alert ${alertStyle} alert-dismissible fade show" role="alert">
              ${message}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>`;
            alertDiv.innerHTML = template;
        });
    }
    GetErrorMessage(error) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = '';
            let errorMessage = error.message;
            if (errorMessage === undefined) {
                errorMessage = error.Message;
            }
            let filedName = error.name;
            if (filedName === undefined) {
                filedName = error.Name;
            }
            if (filedName === '') {
                message += `<li>${errorMessage}</li>`;
            }
            else {
                let foundInput = yield this.DisplayValidationMessage(filedName, errorMessage, false);
                if (foundInput === false) {
                    message += `<li>${errorMessage}</li>`;
                }
            }
            return message;
        });
    }
    DisplayValidationMessage(controlId, message, valid) {
        return __awaiter(this, void 0, void 0, function* () {
            let input = document.getElementById(controlId);
            if (input === null) {
                let inputs = document.getElementsByName(controlId);
                if (inputs.length > 0) {
                    input = inputs[0];
                }
            }
            if (input === null) {
                return false;
            }
            if (input !== null) {
                if (valid) {
                    input.classList.remove(this._invalidClass);
                    input.classList.add(this._validClass);
                }
                else {
                    input.classList.remove(this._validClass);
                    input.classList.add(this._invalidClass);
                }
                let childerns = Array.from(input.parentElement.children);
                let validationSpanExists = false;
                for (let childern of childerns) {
                    if (childern.classList.contains('invalid-feedback')) {
                        let spanItem = childern;
                        spanItem.innerText = message;
                        spanItem.style.display = 'block';
                        validationSpanExists = true;
                        break;
                    }
                }
                if (!validationSpanExists) {
                    let spanItem = document.createElement("span");
                    spanItem.classList.add('invalid-feedback');
                    spanItem.innerText = message;
                    spanItem.style.display = 'block';
                    input.parentElement.appendChild(spanItem);
                }
                return true;
            }
        });
    }
    //private async RemoveAllValidationSpans(): Promise<void> {
    //    let elements = Array.from(this._form.elements);
    //    for (let element of elements) {
    //        let input = element as HTMLInputElement;
    //        if (input.type === 'button') {
    //            continue;
    //        }
    //        let childerns = Array.from(input.parentElement.children);
    //        for (let childern of childerns) {
    //            if (childern.classList.contains('invalid-feedback')) {
    //                //let spanItem = childern as HTMLSpanElement;
    //                childerns = [];
    //                break;
    //            }
    //        }
    //    }
    //}
    ValidateInputForRequired(input) {
        return __awaiter(this, void 0, void 0, function* () {
            let requiredAttribute = input.attributes.getNamedItem(this._validationRequiredMessageAttribute);
            if (requiredAttribute !== null) {
                if (input.value.trim() === "") {
                    yield this.DisplayValidationMessage(input.id, requiredAttribute.value, false);
                    return false;
                }
                else {
                    yield this.DisplayValidationMessage(input.id, '', true);
                }
            }
            else {
                yield this.DisplayValidationMessage(input.id, '', true);
            }
            return true;
        });
    }
    ValidateInputForMaxLength(input, controlDisplayText) {
        return __awaiter(this, void 0, void 0, function* () {
            let maxLengthAttribute = input.attributes.getNamedItem('maxlength');
            if (maxLengthAttribute !== null) {
                if (input.value.length > Number(maxLengthAttribute.value)) {
                    let maxLengthAttributeValidationMessage = input.attributes.getNamedItem(this._validationMaxLengthMessageAttribute);
                    let validationMessage = `The field ${controlDisplayText} must be a string or array type with a maximum length of '${maxLengthAttribute.value}'.`;
                    if (maxLengthAttributeValidationMessage != null) {
                        validationMessage = maxLengthAttributeValidationMessage.value;
                    }
                    yield this.DisplayValidationMessage(input.id, validationMessage, false);
                    return false;
                }
                else {
                    yield this.DisplayValidationMessage(input.id, '', true);
                }
            }
            return true;
        });
    }
    ValidateEmailInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.value.trim() !== "") {
                let emailAttribute = input.attributes.getNamedItem(this._validationEmailMessageAttribute);
                if (emailAttribute !== null) {
                    let validEmail = yield this.ValidateEmail(input.value);
                    if (!validEmail) {
                        yield this.DisplayValidationMessage(input.id, emailAttribute.value, false);
                        return false;
                    }
                    else {
                        yield this.DisplayValidationMessage(input.id, '', true);
                    }
                }
            }
            return true;
        });
    }
    ValidateEmail(mail) {
        return __awaiter(this, void 0, void 0, function* () {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
                return true;
            }
            return false;
        });
    }
    ValidatePhoneInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.value.trim() !== "") {
                let phoneAttribute = input.attributes.getNamedItem(this._validationPhoneMessageAttribute);
                if (phoneAttribute !== null) {
                    let validPhone = yield this.ValidatePhone(input.value);
                    if (!validPhone) {
                        yield this.DisplayValidationMessage(input.id, phoneAttribute.value, false);
                        return false;
                    }
                    else {
                        yield this.DisplayValidationMessage(input.id, '', true);
                    }
                }
            }
            return true;
        });
    }
    ValidatePhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            //XXXXXXXXXX
            let format = /^\d{10}$/;
            if (phone.trim().match(format)) {
                return true;
            }
            else {
                //XXX-XXX-XXXX or XXX.XXX.XXXX or XXX XXX XXXX
                format = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (phone.trim().match(format)) {
                    return true;
                }
                else {
                    //+XX-XXXX-XXXX or +XX.XXXX.XXXX or + XX XXXX XXXX
                    format = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
                    if (phone.trim().match(format)) {
                        return true;
                    }
                }
            }
            return false;
        });
    }
    ValidateDecimal(value, minValue, maxValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let number = Number(value.trim());
            if (number !== null) {
                if (number >= minValue && number <= maxValue) {
                    return true;
                }
            }
            return false;
        });
    }
    ValidateNumberInput(input) {
        return __awaiter(this, void 0, void 0, function* () {
            if (input.value.trim() !== "") {
                let numberAttribute = input.attributes.getNamedItem(this._validationNumberMessageAttribute);
                if (numberAttribute !== null) {
                    let numberMinRangeAttribute = input.attributes.getNamedItem(this._validationNumberMinRangeAttribute);
                    let minValue = Number.MIN_VALUE;
                    if (numberMinRangeAttribute !== null) {
                        minValue = Number(numberMinRangeAttribute.value);
                    }
                    let numberMaxRangeAttribute = input.attributes.getNamedItem(this._validationNumberMaxRangeAttribute);
                    let maxValue = Number.MAX_VALUE;
                    if (numberMaxRangeAttribute !== null) {
                        maxValue = Number(numberMaxRangeAttribute.value);
                    }
                    let validNumber = yield this.ValidateDecimal(input.value, minValue, maxValue);
                    if (!validNumber) {
                        yield this.DisplayValidationMessage(input.id, numberAttribute.value, false);
                        return false;
                    }
                    else {
                        yield this.DisplayValidationMessage(input.id, '', true);
                    }
                }
                let integerAttribute = input.attributes.getNamedItem(this._validationIntegerMessageAttribute);
                if (integerAttribute !== null) {
                    let numberMinRangeAttribute = input.attributes.getNamedItem(this._validationNumberMinRangeAttribute);
                    let minValue = Number.MIN_VALUE;
                    if (numberMinRangeAttribute !== null) {
                        minValue = Number(numberMinRangeAttribute.value);
                    }
                    let numberMaxRangeAttribute = input.attributes.getNamedItem(this._validationNumberMaxRangeAttribute);
                    let maxValue = Number.MAX_VALUE;
                    if (numberMaxRangeAttribute !== null) {
                        maxValue = Number(numberMaxRangeAttribute.value);
                    }
                    let validInteger = yield this.ValidateInteger(input.value, minValue, maxValue);
                    if (!validInteger) {
                        yield this.DisplayValidationMessage(input.id, integerAttribute.value, false);
                        return false;
                    }
                    else {
                        yield this.DisplayValidationMessage(input.id, '', true);
                    }
                }
            }
            return true;
        });
    }
    ValidateInteger(value, minValue, maxValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let format = /^[0-9]+$/;
            if (value.trim().match(format)) {
                let number = Number(value.trim());
                if (number >= minValue && number <= maxValue) {
                    return true;
                }
                return false;
            }
            return false;
        });
    }
    ValidateAllLetters(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let format = /^[A-Za-z]+$/;
            if (value.trim().match(format)) {
                return true;
            }
            return false;
        });
    }
}


/***/ }),

/***/ 14:
/*!**************************************!*\
  !*** ./Client/Common/GridManager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GridManager": () => (/* binding */ GridManager),
/* harmony export */   "GridSetting": () => (/* binding */ GridSetting)
/* harmony export */ });
/* harmony import */ var gridjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gridjs */ 8);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class GridManager {
    Init(setting) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.InitSettings(setting);
        });
    }
    InitSettings(setting) {
        return __awaiter(this, void 0, void 0, function* () {
            this.DataGrid = new gridjs__WEBPACK_IMPORTED_MODULE_0__.Grid({
                autoWidth: true,
                width: "100%",
                /*height: '400px',*/
                fixedHeader: true,
                resizable: true,
                columns: setting.Columns,
                pagination: {
                    enabled: setting.AllowPagination,
                    limit: setting.PageLength,
                    server: {
                        url: (prev, page, limit) => {
                            return `${prev}&length=${limit}&start=${page * limit}&${setting.GetSearchQuery()}`;
                        }
                    }
                },
                sort: {
                    multiColumn: false,
                    server: {
                        url: (prev, columns) => {
                            let dir = 'asc';
                            let index = 0;
                            if (columns.length > 0) {
                                dir = columns[0].direction === 1 ? 'asc' : 'desc';
                                index = columns[0].index;
                            }
                            let colName = setting.Columns[index].id;
                            return `${prev}&SortColumn=${colName}&SortDirection=${dir}&${setting.GetSearchQuery()}`;
                        }
                    }
                },
                className: {
                    table: 'table table-responsive',
                    thead: 'table-dark'
                },
                server: {
                    method: "GET",
                    url: setting.SearchUrl,
                    then: data => data.data,
                    total: data => data.recordsTotal,
                    handle: (res) => {
                        // no matching records found
                        //if (res.status === 404) return { data: [] };
                        if (res.ok) {
                            return res.json();
                        }
                        throw Error(res.status.toString());
                    }
                }
            });
            this.DataGrid.render(document.getElementById(setting.Container));
        });
    }
    //async OnLoad(): Promise<void> {
    //}
    Search() {
        return __awaiter(this, void 0, void 0, function* () {
            this.DataGrid.forceRender();
        });
    }
}
class GridSetting {
    constructor() {
        this.InfoText = "Showing _PAGE_ of _PAGES_ entries";
        this.InfoEmptyText = "No Records found";
        this.AllowPagination = true;
        this.PageLength = 10;
        this.Container = "DataGrid";
        this.SearchFields = new Array();
        this.SortOrder = "asc";
        this.SortIndex = 0;
    }
    GetSearchQuery() {
        let searchQuery = '';
        for (let searchField of this.SearchFields) {
            let element = document.getElementById(searchField);
            if (element !== null && element.value != null) {
                searchQuery += `${searchField}=${element.value}&`;
            }
        }
        return searchQuery;
    }
}


/***/ }),

/***/ 13:
/*!**************************************!*\
  !*** ./Client/Common/HttpManager.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ResponseType": () => (/* binding */ ResponseType),
/* harmony export */   "HttpManager": () => (/* binding */ HttpManager)
/* harmony export */ });
/* harmony import */ var _ProgressBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProgressBar */ 31);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

var ResponseType;
(function (ResponseType) {
    ResponseType[ResponseType["Json"] = 0] = "Json";
    ResponseType[ResponseType["Text"] = 1] = "Text";
    ResponseType[ResponseType["Blob"] = 2] = "Blob";
    ResponseType[ResponseType["FormData"] = 3] = "FormData";
})(ResponseType || (ResponseType = {}));
class HttpManager {
    constructor(authToken = "") {
        //private _authToken: string;
        this._headers = new Headers();
        this._requestedWithHeader = "X-Requested-With";
        this._xmlHttpRequest = "XMLHttpRequest";
        this._authTokenName = "X-XSRF-TOKEN";
        let headers = new Headers();
        headers.set("Authorization", authToken);
        this._headers = headers;
    }
    get(url, method, responseType, body) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = { method: method, body: body, headers: this._headers };
            let progressBar = new _ProgressBar__WEBPACK_IMPORTED_MODULE_0__.ProgressBar();
            let progressMessage = "Loading...";
            switch (method) {
                case 'post':
                    progressMessage = "Creating...";
                    break;
                case 'put':
                    progressMessage = "Updating...";
                    break;
                case 'delete':
                    progressMessage = "Deleting...";
                    break;
                default:
                    progressMessage = "Loading...";
                    break;
            }
            progressBar.show(progressMessage);
            const response = yield fetch(url, request);
            try {
                if (response.ok) {
                    switch (responseType) {
                        case ResponseType.Blob:
                            response.data = yield response.blob();
                            break;
                        case ResponseType.FormData:
                            response.data = yield response.formData();
                            break;
                        default:
                            try {
                                response.data = yield response.json();
                            }
                            catch (_a) {
                                try {
                                    response.data = yield response.text();
                                }
                                catch (_b) {
                                    response.data = "";
                                }
                            }
                            break;
                    }
                }
                else {
                    try {
                        response.data = yield response.json();
                    }
                    catch (_c) {
                        response.data = yield response.text();
                    }
                }
            }
            catch (ex) {
                progressBar.hide();
                throw Error(`Error occurred while deserialize the Form Response`);
            }
            progressBar.hide();
            //if (!response.ok) {
            //    //try {
            //    //    alert(response.data.Message);
            //    //} catch (error) {
            //    //    alert(response.status + ": " + response.data);
            //    //}
            //    throw new Error(response.data);
            //}
            return response;
        });
    }
    getJson(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "get", ResponseType.Json);
        });
    }
    getText(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "get", ResponseType.Text);
        });
    }
    getBlob(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "get", ResponseType.Blob);
        });
    }
    getFormData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "get", ResponseType.FormData);
        });
    }
    postJson(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "post", ResponseType.Json, JSON.stringify(body));
        });
    }
    postForm(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "post", ResponseType.Json, new FormData(body));
        });
    }
    putJson(url, body, args = { method: "put", body: JSON.stringify(body) }) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "put", ResponseType.Json, JSON.stringify(body));
        });
    }
    putForm(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "put", ResponseType.Json, new FormData(body));
        });
    }
    deleteJson(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "delete", ResponseType.Json, JSON.stringify(body));
        });
    }
    deleteForm(url, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get(url, "delete", ResponseType.Json, new FormData(body));
        });
    }
}


/***/ }),

/***/ 31:
/*!**************************************!*\
  !*** ./Client/Common/ProgressBar.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProgressBar": () => (/* binding */ ProgressBar)
/* harmony export */ });
class ProgressBar {
    constructor() {
        this._loadingIndicatorElementName = "loading-indicator";
        this._showLoadingIndicator = false;
    }
    show(message = 'Loading...', loadingIndicatorDelay = 2000) {
        this._loadingIndicatorDelay = loadingIndicatorDelay;
        this._showLoadingIndicator = true;
        this._loadingIndicatortimeOutRef = new Promise(resolve => setTimeout(resolve.call(this.showProgressBar(message)), this._loadingIndicatorDelay));
    }
    hide() {
        this.hideProgressBar();
    }
    showProgressBar(message = 'Loading...') {
        if (this._showLoadingIndicator) {
            let indecator = `<div class="spinner-border text-primary loading-Icon" role="status"><span class="sr-only">${message}</span></div><span class="loading-text">${message}</span>`;
            let lodiningIndecator = this.getLoadingIndicator();
            lodiningIndecator.innerHTML = indecator;
            lodiningIndecator.style.display = 'block';
        }
    }
    hideProgressBar() {
        this._showLoadingIndicator = false;
        let lodiningIndecator = document.getElementById(this._loadingIndicatorElementName);
        if (lodiningIndecator !== null) {
            lodiningIndecator.style.display = 'none';
        }
        clearTimeout(this._loadingIndicatortimeOutRef);
    }
    getLoadingIndicator() {
        let lodiningIndecator = document.getElementById(this._loadingIndicatorElementName);
        if (lodiningIndecator === null) {
            let childerns = document.body.children;
            let lodiningIndecatorExists = false;
            for (let i = 0; i < childerns.length; i++) {
                if (childerns[i].id === this._loadingIndicatorElementName) {
                    lodiningIndecatorExists = true;
                    break;
                }
            }
            if (!lodiningIndecatorExists) {
                let divItem = document.createElement("div");
                divItem.id = this._loadingIndicatorElementName;
                document.body.insertBefore(divItem, document.body.firstChild);
                lodiningIndecator = document.getElementById(this._loadingIndicatorElementName);
            }
        }
        return lodiningIndecator;
    }
}


/***/ }),

/***/ 0:
/*!***********************************!*\
  !*** ./Client/Common/UiHelper.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UiHelper": () => (/* binding */ UiHelper),
/* harmony export */   "onDocReady": () => (/* binding */ onDocReady)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var onDocReady = (callback) => {
    if (document.readyState == "loading") {
        // loading yet, wait for the event
        document.addEventListener('DOMContentLoaded', callback);
    }
    else {
        callback();
    }
};
class UiHelper {
    getHeaderMessageElement(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            let alertDiv = parent.getElementById('HeaderAlertMessage');
            if (alertDiv === null) {
                let childerns = parent.children;
                let alertDivExists = false;
                for (let i = 0; i < childerns.length; i++) {
                    if (childerns[i].id === 'HeaderAlertMessage') {
                        alertDivExists = true;
                        break;
                    }
                }
                if (!alertDivExists) {
                    let divItem = document.createElement("div");
                    divItem.id = 'HeaderAlertMessage';
                    document.insertBefore(divItem, document.firstChild);
                    alertDiv = parent.getElementById('HeaderAlertMessage');
                }
            }
            return alertDiv;
        });
    }
    GetDateString(date) {
        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];
        let dateObj = new Date(date);
        let day = dateObj.getDate();
        let monthIndex = dateObj.getMonth();
        let monthName = monthNames[monthIndex];
        let year = dateObj.getFullYear();
        return `${day}-${monthName}-${year}`;
    }
}



/***/ })

}]);
//# sourceMappingURL=common-bundle.js.map