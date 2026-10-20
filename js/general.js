let menu = null;

window.addEventListener("scroll", scrollHandler, { passive: true });

function scrollHandler() {
    if (!menu) {
        menu = document.getElementById("mnuHeader");
    }

    // Some pages may not contain the secondary header.
    if (!menu) return;

    if ((window.pageYOffset - 35) > menu.offsetTop) {
        menu.classList.add("not-shown");
    } else if ((window.pageYOffset + 35) < menu.offsetTop) {
        menu.classList.remove("not-shown");
    }
}

function showSubMenuMain(id) {
    const submenu = document.getElementById(id);
    if (!submenu) return;

    submenu.classList.toggle("d-block");
    submenu.classList.toggle("d-none");
}

function showSidebar() {
    document.querySelectorAll(".shadowSidebar").forEach(el => {
        el.classList.remove("d-none");
        el.classList.add("d-block");
    });
    document.querySelectorAll(".mnuSidebar").forEach(el => {
        el.style.right = "0px";
    });
}

function hideSidebar() {
    document.querySelectorAll(".shadowSidebar").forEach(el => {
        el.classList.remove("d-block");
        el.classList.add("d-none");
    });
    document.querySelectorAll(".mnuSidebar").forEach(el => {
        el.style.right = "-270px";
    });
}

function OverlayMenu() {
    document.querySelectorAll(".overlayMenu").forEach(el => {
        el.classList.toggle("showOverlayMenu");
    });
}

function ItemHoverHandler(e) {
    if (!e || !e.currentTarget) return;

    const items = document.getElementsByClassName("catItem");
    for (const item of items) {
        item.classList.remove("defautCategorySelect");
    }
    e.currentTarget.classList.add("defautCategorySelect");

    const submenus = document.getElementsByClassName("categoriesSubMenu");
    for (const submenu of submenus) {
        submenu.classList.remove("defautSubMenuSelect");
    }

    const selectedId = e.currentTarget.id || "";
    const parts = selectedId.split("-");
    const subcategoryId = parts.length > 1 ? "subCat-" + parts.slice(1).join("-") : "";
    const selectedSubmenu = subcategoryId ? document.getElementById(subcategoryId) : null;
    if (selectedSubmenu) {
        selectedSubmenu.classList.add("defautSubMenuSelect");
    }
}

function toggleMenuProfile() {
    const profileMenus = document.querySelectorAll(".sec-mnu-Profile");
    profileMenus.forEach(el => {
        const willOpen = !el.classList.contains("d-flex");
        el.classList.toggle("d-flex", willOpen);
        el.classList.toggle("d-none", !willOpen);
    });
}

// One delegated listener avoids accumulating a new document handler each time
// the profile menu is opened.
document.addEventListener("click", function(e) {
    if (e.target.closest(".nameUser") || e.target.closest(".arrowDown")) return;

    document.querySelectorAll(".sec-mnu-Profile").forEach(el => {
        el.classList.remove("d-flex");
        el.classList.add("d-none");
    });
});
