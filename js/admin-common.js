(function () {
    'use strict'
    showHideSidebar();
    let sidebarToggler = document.getElementById("SidebarToggler");
    sidebarToggler.addEventListener("click", showHideSidebar);
})();
window.onresize = showHideSidebar;

function showHideSidebar() {
    let sidebarCloseWidth = "60px";
    let sidebarOpenWidth = "200px";
    let logo = document.querySelector(".header-logo")
    logo.classList.remove('d-inline')
    logo.classList.remove('d-none')
    logo.classList.add('d-inline')
    let deviceWidth = window.matchMedia("(max-width: 600px)")
    if (deviceWidth.matches) {

        sidebarCloseWidth = "50px";
        sidebarOpenWidth = "0";
        logo.classList.add('d-none')
    }
    let mainContainer = document.querySelector(".main")
    let sidebar = document.getElementById('Sidebar');
    if (sidebar == null) { return; }
    let isVisible = sidebar.classList.contains('sidebarOpen');
    try {
       $.get(`/SetSidebarStatus?isOpen=${isVisible}`);
    } catch (ex) {

    }
    
    let menuTexts = document.querySelectorAll('.menuText');
    let footer = document.querySelector('.footer');

    if (isVisible) {
        sidebar.classList.remove('sidebarOpen');
        sidebar.classList.add('sidebarClose');
        for (let menuText of menuTexts) {
            menuText.classList.add('d-none');
        }
        mainContainer.style.marginLeft = sidebarCloseWidth;//Push Content Right
        if (footer != null) {
            footer.style.marginLeft = sidebarCloseWidth;
        }

    } else {
        sidebar.classList.remove('sidebarClose');
        sidebar.classList.add('sidebarOpen');
        for (let menuText of menuTexts) {
            menuText.classList.remove('d-none');
        }
        mainContainer.style.marginLeft = sidebarOpenWidth;//Push Content Right
        if (footer != null) {
            footer.style.marginLeft = sidebarOpenWidth;
        }
    }
    return false;
}
