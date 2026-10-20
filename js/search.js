let rangeInput, range, sm_rangeInput,sm_range;
let priceGap;
function showMenuParameter(){
    $('.shadowParameter').toggleClass('d-block');
    $('.shadowParameter').toggleClass('d-none');
    $('.sm-parameter').css("right", "0px");
}
function hideMenuParameter(){
    $('.shadowParameter').toggleClass('d-block');
    $('.shadowParameter').toggleClass('d-none');
    $('.sm-parameter').css("right", "-270px");
}
function toggleMenuSort(){
    const menu = document.querySelector('.sec-mnu-Order');
    if (!menu) return;
    const isOpen = menu.classList.contains('d-flex');
    menu.classList.toggle('d-flex', !isOpen);
    menu.classList.toggle('d-none', isOpen);
}
function toggleItemParameter(o,strId){
    $(strId).toggleClass('d-flex');
    $(strId).toggleClass('d-none');
    $(o).toggleClass('fa-angle-up');
    $(o).toggleClass('fa-angle-down');
}
$(document).ready(function () {
    priceGap = 500;
    rangeInput = document.querySelectorAll(".range-input > input");
    range = document.querySelector(".sliderPrice > .progress");
    rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(rangeInput[0].value),
                maxVal = parseInt(rangeInput[1].value);
            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    rangeInput[0].value = maxVal - priceGap;
                } else {
                    rangeInput[1].value = minVal + priceGap;
                }
            } else {
                range.style.right = (minVal / rangeInput[0].max) * 100 + "%";
                range.style.left = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        });
    });
    sm_rangeInput = document.querySelectorAll(".sm-range-input > input");
    sm_range = document.querySelector(".sm-slider-price > .progress");
    sm_rangeInput.forEach((input) => {
        input.addEventListener("input", (e) => {
            let minVal = parseInt(sm_rangeInput[0].value),
                maxVal = parseInt(sm_rangeInput[1].value);
            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    sm_rangeInput[0].value = maxVal - priceGap;
                } else {
                    sm_rangeInput[1].value = minVal + priceGap;
                }
            } else {
                sm_range.style.right = (minVal / sm_rangeInput[0].max) * 100 + "%";
                sm_range.style.left = 100 - (maxVal / sm_rangeInput[1].max) * 100 + "%";
            }
        });
    });
    // Respect reduced-motion preferences and do not initialize a missing slider.
    const sliderElement = document.querySelector('.advertisSlider');
    if (sliderElement && typeof Swiper !== 'undefined') {
        const prefersReducedMotion = window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        new Swiper(sliderElement, {
            speed: prefersReducedMotion ? 0 : 400,
            spaceBetween: 10,
            autoplay: !prefersReducedMotion
        });
    }

    // Register once instead of adding another document listener on every menu toggle.
    document.addEventListener('click', function (event) {
        if (event.target.closest('.sortMenu')) return;
        document.querySelectorAll('.sec-mnu-Order.d-flex').forEach(function (menu) {
            menu.classList.remove('d-flex');
            menu.classList.add('d-none');
        });
    });
});