$(document).ready(function () {
    const small_imageGallery = new Swiper(".small-imageGallery", {
        slidesPerView: 4,
        spaceBetween : 18
    });
    const big_imageGallery = new Swiper(".big-imageGallery", {
        slidesPerView: 1,
        thumbs: {
            swiper: small_imageGallery,
        },
    });

    const imageGallerySlider = new Swiper ('.sm-imagesGallery', {
        pagination: {
            el: '.imagesGalleryPagination',
            dynamicBullets: true,
        }
    });
    const relateSlider = new Swiper('.relate-Products', {
        slidesPerView : 'auto',
        loop:false,
        autoplay: true,
        breakpoints: {
            320:{
                slidesPerView: 1,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 15,
            },
            1440: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
        }
    });
});