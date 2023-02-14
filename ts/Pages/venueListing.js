(self["webpackChunkevenues"] = self["webpackChunkevenues"] || []).push([[16],{

/***/ 56:
/*!**************************************!*\
  !*** ./Client/Pages/VenueListing.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VenueListingManager": () => (/* binding */ VenueListingManager)
/* harmony export */ });
/* harmony import */ var _Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Common/UiHelper */ 0);
/* harmony import */ var _Common_GridManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Common/GridManager */ 14);
/* harmony import */ var gridjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gridjs */ 8);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



//import { } from 'google.maps';
class VenueListingManager {
    //private _map: google.maps.Map;
    InitGrid() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager = new _Common_GridManager__WEBPACK_IMPORTED_MODULE_1__.GridManager();
            let host = document.getElementById("HostName");
            this._hostUrl = host.value;
            let searchButton = document.getElementById("searchButton");
            if (searchButton !== null) {
                searchButton.addEventListener("click", (e) => this.Search());
            }
            let searchSort = document.getElementById("Search_Sort");
            if (searchSort !== null) {
                searchSort.value = "eVenuesPicks";
            }
            let sortChecks = document.querySelectorAll('input[name="Sort"]');
            for (let element of Array.from(sortChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_Sort", el.value); }));
            }
            let searchPropertName = document.getElementById("Search_PropertyName");
            if (searchPropertName !== null) {
                searchPropertName.value = "";
            }
            let searchGuest = document.getElementById("Search_Guest");
            if (searchGuest !== null) {
                searchGuest.value = "Any";
            }
            let guestChecks = document.querySelectorAll('input[name="Guest"]');
            for (let element of Array.from(guestChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_Guest", el.value); }));
            }
            let searchPriceRange = document.getElementById("Search_PriceRange");
            if (searchPriceRange !== null) {
                searchPriceRange.value = "Any";
            }
            let priceRangeChecks = document.querySelectorAll('input[name="PriceRange"]');
            for (let element of Array.from(priceRangeChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_PriceRange", el.value); }));
            }
            let searchAmenities = document.getElementById("Search_Amenities");
            if (searchAmenities !== null) {
                searchAmenities.value = "Any";
            }
            let amenityChecks = document.querySelectorAll('input[name="Amenity"]');
            for (let element of Array.from(amenityChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_Amenities", el.value); }));
            }
            let searchPropertyType = document.getElementById("Search_PropertyType");
            if (searchPropertyType !== null) {
                searchPropertyType.value = "Any";
            }
            let propertyTypeChecks = document.querySelectorAll('input[name="PropertyType"]');
            for (let element of Array.from(propertyTypeChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_PropertyType", el.value); }));
            }
            let searchGuestRating = document.getElementById("Search_GuestRating");
            if (searchGuestRating !== null) {
                searchGuestRating.value = "Any";
            }
            let guestRatingChecks = document.querySelectorAll('input[name="GuestRating"]');
            for (let element of Array.from(guestRatingChecks)) {
                let el = element;
                element.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () { return this.UpdateSearchField("Search_GuestRating", el.value); }));
            }
            let searchByVenueNameLink = document.getElementById("SearchByVenueNameLink");
            if (searchByVenueNameLink !== null) {
                searchByVenueNameLink.addEventListener("click", (e) => __awaiter(this, void 0, void 0, function* () {
                    if (searchPropertName.value === "") {
                        alert('Please enter venue name');
                        return false;
                    }
                    this.Search();
                    return false;
                }));
            }
            //let searchNeighborhood = document.getElementById("Search_Neighborhood") as HTMLInputElement;
            //if (searchNeighborhood !== null) {
            //    let neighborhoodCheck = document.getElementsByName("Neighborhood")[0] as HTMLInputElement;
            //    searchNeighborhood.value = neighborhoodCheck.checked.toString();
            //}
            //let searchPropertyClass = document.getElementById("Search_PropertyClass") as HTMLInputElement;
            //if (searchPropertyClass !== null) {
            //    let propertyClassCheck = document.getElementsByName("PropertyClass")[0] as HTMLInputElement;
            //    searchPropertyClass.value = propertyClassCheck.checked.toString();
            //}
            let gridSetting = new _Common_GridManager__WEBPACK_IMPORTED_MODULE_1__.GridSetting();
            gridSetting.SearchFields = ["Search_MeetingCity", "Search_MeetingDate", "Search_MeetingCategory", "Search_MeetingCapacity", "Search_Sort", "Search_PropertyName", "Search_Neighborhood", "Search_Guest", "Search_PriceRange", "Search_Amenities", "Search_PropertyType", "Search_GuestRating"];
            gridSetting.SearchUrl = `${this._hostUrl}/meeting-spaces?handler=Search`;
            gridSetting.PageLength = 25;
            gridSetting.Columns = [
                { id: "RowId", name: "", sort: false, formatter: (cell, row) => (0,gridjs__WEBPACK_IMPORTED_MODULE_2__.html)(this.GetCard(this._hostUrl, row)) },
                { id: "RoomId", name: "Room Id", hidden: true },
                { id: "SpaceName", name: "Space Name", hidden: true },
                { id: "BuildingType", name: "Building Type", hidden: true },
                { id: "RoomType", name: "Room Type", hidden: true },
                { id: "RoomName", name: "Room Name", hidden: true },
                { id: "DailyRate", name: "Daily Rate", hidden: true },
                { id: "HourlyRate", name: "Hourly Rate", hidden: true },
                { id: "ThumbnailId", name: "Room Image", hidden: true },
                { id: "Slug", name: "Slug", hidden: true },
                { id: "MaxCapacity", name: "MaxCapacity", hidden: true },
                { id: "Reviews", name: "Reviews", hidden: true },
                { id: "AverageRating", name: "Average Rating", hidden: true },
                { id: "WiFi", name: "WiFi", hidden: true },
                { id: "SmokingAllowed", name: "Smoking Allowed", hidden: true },
                { id: "InHouseCatering", name: "InHouse Catering", hidden: true },
                { id: "ADAAccessible", name: "ADA Accessible", hidden: true },
                { id: "GovtDiscount", name: "Govt Discount", hidden: true },
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
            this.SetMarkers("");
        });
    }
    UpdateSearchField(elementId, elementValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let searchHidden = document.getElementById(elementId);
            if (searchHidden !== null) {
                searchHidden.value = elementValue;
            }
            this.Search();
        });
    }
    GetCard(host, row) {
        let review = this.GetRatings(row);
        let amenities = this.GetAmenities(row);
        let rentals = this.GetRentals(row, host);
        let col1 = `<div class="search-card shadow">
                        <div class="search-card__number">${row.cells[0].data}</div>
                        <div class="search-card__image">
                            <img class="card-img-top" src="${host}/Image/${row.cells[8].data}" alt="${row.cells[5].data}"/>
                        </div>`;
        var col2 = `<div class="search-card__info">
                        <div class="search-card__leftinfo">
                            <div class="d-flex flex-column">
                                <a class="search-card__title" href="${host}${row.cells[9].data}">${row.cells[5].data}</a> 
                                 ${review}
                            </div>
                            <div class="search-card__location">${row.cells[2].data}</div>
                            <ul class="search-card__list small">
                                <li><span>Venue Type: ${row.cells[3].data}</span></li>
                            </ul>
                            ${amenities}
                        </div>
                   </div>
                   <div class="search-card__rightinfo" style="min-width:125px;">
                        <div class="search-card__capacity text-primary d-flex">
                            <i class="fas fa-user-friends"></i> <strong>${row.cells[10].data}</strong>
                        </div>
                        ${rentals}
                   </div>`;
        return `${col1}${col2}</div>`;
    }
    GetAmenities(row) {
        let amenities = "";
        if (row.cells[13].data) {
            amenities += `<i class="fas fa-wifi mx-2" title="Wifi Provided"></i>`;
        }
        if (row.cells[14].data) {
            amenities += `<i class="fas fa-smoking mx-2" title="Smooking Allowed"></i>`;
        }
        if (row.cells[15].data) {
            amenities += `<i class="fas fa-utensils mx-2" title="In-house Cateroing Allowed"></i>`;
        }
        if (row.cells[16].data) {
            amenities += `<i class="fab fa-accessible-icon mx-2" title="ADA Accecible"></i>`;
        }
        if (row.cells[17].data) {
            amenities += `<i class="fas fa-percent mx-2" title="Government Discount Allowed"></i>`;
        }
        amenities = `<div class="search-card__amenities">
                        <span class="search-card__amenities__title">Amenities</span>
                        <ul class="search-card__amenitieslist">
                            <li>${amenities}</li>
                        </ul>
                    </div>`;
        return amenities;
    }
    GetRatings(row) {
        let starReview = "";
        let review = row.cells[11].data;
        let averageRating = row.cells[12].data;
        if (review > 0) {
            if (averageRating >= 1) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 2) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 3) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating >= 4) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            if (averageRating == 5) {
                starReview += `<i class="fas fa-star"></i>`;
            }
            starReview = `<div class="search-card__review text-dark">
                <div class="search-card__rating">${starReview}</div>
                    <div class="search-card__numreviews">
                        <span class="bold">${averageRating}/5</span>
                        <span class="text-dark" href="#"> (${review} reviews)</span>
                    </div>
                </div>`;
        }
        return starReview;
    }
    GetRentals(row, host) {
        var hourlyRental = "<b>NO</b> hourly rental";
        if (row.cells[7].data > 0) {
            hourlyRental = "$" + row.cells[7].data + "/hr";
        }
        var dailyRental = "<b>NO</b> daily rental";
        if (row.cells[6].data > 0) {
            dailyRental = "$" + row.cells[6].data + "/day";
        }
        return `<ul class="search-card__price"><li>${hourlyRental}</li><li>${dailyRental}</li><li><a class="btn btn-primary btn-block mt-3 mb-1" href="${host}${row.cells[9].data}">View</a></li></ul>`;
    }
    SetMarkers(venues) {
        // Adds markers to the map.
        //const center: google.maps.LatLngLiteral = { lat: 30, lng: -110 };
        //this._map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        //    center,
        //    zoom: 8
        //});
        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.
        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        //let image = {
        //    url: './images/icons/logo-20-20.png',
        //    // This marker is 20 pixels wide by 32 pixels high.
        //    size: new google.maps.Size(20, 20),
        //    // The origin for this image is (0, 0).
        //    origin: new google.maps.Point(0, 0),
        //    // The anchor for this image is the base of the flagpole at (0, 32).
        //    anchor: new google.maps.Point(0, 32)
        //};
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var centerLat = 38.9053975;
        var centerLang = -76.9891191;
        //$.each(venues.data, function (i, venue) {
        //    if (i == 0) {
        //        centerLat = venue.Latitude;
        //        centerLang = venue.Longitude;
        //    }
        //    var marker = new google.maps.Marker({
        //        position: { lat: venue.Latitude, lng: venue.Longitude },
        //        map: map,
        //        icon: image,
        //        title: venue.RoomName,
        //        zIndex: venue.RoomId,
        //        zoom: 17
        //    });
        //});
        //map.setCenter({ lat: centerLat, lng: centerLang });
    }
    Search() {
        return __awaiter(this, void 0, void 0, function* () {
            this._gridManager.Search();
        });
    }
}
(0,_Common_UiHelper__WEBPACK_IMPORTED_MODULE_0__.onDocReady)(() => __awaiter(void 0, void 0, void 0, function* () {
    let page = new VenueListingManager();
    yield page.InitGrid();
}));


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, [1,2], () => (__webpack_exec__(56)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=venueListing.js.map