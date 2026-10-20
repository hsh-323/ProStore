    let menu;
    window.onscroll = function() {scrollHandler()};
    function scrollHandler() {
        if (menu){
            if ((window.pageYOffset - 35) > menu.offsetTop) {
                menu.classList.add("not-shown");
            }
            if ((window.pageYOffset + 35) < menu.offsetTop) {
                menu.classList.remove("not-shown");
            }
        }
        else{
            menu = document.getElementById("mnuHeader");
            menu.classList.add("not-shown");
        }
    }
    function showSubMenuMain(id){
        $('#'+id).toggleClass('d-block');
        $('#'+id).toggleClass('d-none');
    }
    function showSidebar(){
        $('.shadowSidebar').toggleClass('d-block');
        $('.shadowSidebar').toggleClass('d-none');
        $('.mnuSidebar').css("right", "0px");
    }
    function hideSidebar(){
        $('.shadowSidebar').toggleClass('d-block');
        $('.shadowSidebar').toggleClass('d-none');
        $('.mnuSidebar').css("right", "-270px");
    }
    function OverlayMenu(){
        $('.overlayMenu').toggleClass('showOverlayMenu');
    }
    function ItemHoverHandler (e) {
        let elements = document.getElementsByClassName("catItem");
        for (let i = 0; i <= elements.length-1 ;i++) {
        elements[i].classList.remove("defautCategorySelect");
        }
        e.currentTarget.classList.add("defautCategorySelect");
        elements = document.getElementsByClassName("categoriesSubMenu");
        for (let i = 0; i <= elements.length - 1; i++) {
        elements[i].classList.remove("defautSubMenuSelect");
        }
        let idSelected = e.currentTarget.id;
        const [name, id] = idSelected.split("-");
        let idSubCat = "subCat-" + id;
        elements = document.getElementById(idSubCat);
        if (elements)
        elements.classList.add("defautSubMenuSelect");
    }
    function toggleMenuProfile(){
        $('.sec-mnu-Profile').toggleClass('d-flex');
        $('.sec-mnu-Profile').toggleClass('d-none');
        document.addEventListener("click", function(e) {
        if (e.target.closest(".nameUser") || e.target.closest(".arrowDown") ) {
        return;
        }
        $('.sec-mnu-Profile').removeClass('d-flex');
        $('.sec-mnu-Profile').addClass('d-none');
        });
    }