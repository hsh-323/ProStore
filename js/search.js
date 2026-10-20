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
    $('.sec-mnu-Order').toggleClass('d-flex');
    $('.sec-mnu-Order').toggleClass('d-none');
    document.addEventListener("click", function(e) {
        if (e.target.closest(".sortMenu") ) {
            return;
        }
        $('.sec-mnu-Order').removeClass('d-flex');
        $('.sec-mnu-Order').addClass('d-none');
    });
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
    const advertisSlider = new Swiper ('.advertisSlider', {
        speed: 400,
        spaceBetween: 10,
        autoplay:true
    });
});