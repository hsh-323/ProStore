$(document).ready(function () {
    const headerSlider = new Swiper('.header-Slider', {
        pagination: {
            el: '.imagesGalleryPagination',
            dynamicBullets: true,
        },
        autoplay:true,
        speed: 400
    });
    const selectedNews = new Swiper('.selected-news-slider', {
        slidesPerView : 'auto',
        loop:false,
        breakpoints: {
            320:{
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        }
    });
});