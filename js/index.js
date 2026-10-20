$(document).ready(function () {
    const advertisSlider = new Swiper ('.advertisSlider', {
        speed: 400,
        spaceBetween: 10,
        autoplay:true
    });
    const brandSlider = new Swiper('.brandSection', {
        slidesPerView : 'auto',
        initialSlide : 6,
        loop:false,
        breakpoints: {
            320:{
                slidesPerView:2,
                spaceBetween: 0,
            },
            640: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 4,
                spaceBetween: 0,
            },
            1024: {
                slidesPerView: 6,
                spaceBetween: 0,
            },
        }
    });
    const promosSlider = new Swiper('.sec-promos-slider', {
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
                slidesPerView: 1,
                spaceBetween: 15,
            },
        }
    });

    const thumbsAmazing = new Swiper(".thumbs-amazing", {
        direction: "vertical",
        spaceBetween: 0,
        slidesPerView:3,
        breakpoints: {
            768: {
            //    direction: "vertical",
                spaceBetween: 0,
                slidesPerView:3,
            },
            1024: {
            //    direction: "vertical",
                spaceBetween: 0,
                slidesPerView:3,
            },
            1280: {
             //   direction: "vertical",
                spaceBetween: 0,
                slidesPerView:3,
            },
            1440: {
             //   direction: "vertical",
                spaceBetween: 0,
                slidesPerView:3,
            }
        }
    });
    const sliderAmazing = new Swiper(".slider-amazing", {
        slidesPerView: 1,
        spaceBetween: 15,
        autoplay:true,
        thumbs: {
            swiper: thumbsAmazing,
        },
    });
    const sliderAmazingSm = new Swiper(".slider-amazing-sm", {
        slidesPerView: 1,
        spaceBetween: 15,
        autoplay:true,
    });

    const hotProductSlider = new Swiper('.hotProducts', {
        slidesPerView :'auto',
        loop:false,
        breakpoints: {
            320:{
                slidesPerView: 1,
                spaceBetween: 15,
            },
            640: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            768: {
                slidesPerView: 1,
                spaceBetween: 15,
            },
            1024: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1280: {
                slidesPerView: 2,
                spaceBetween: 15,
            },
            1440: {
                slidesPerView: 3,
                spaceBetween: 15,
            },
        }
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
        },
        autoplay:true
    });
});
