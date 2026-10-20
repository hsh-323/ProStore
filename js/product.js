$(document).ready(function () {
    // Some pages can reuse this script without rendering every slider.
    if (typeof Swiper === "undefined") return;

    const smallGalleryElement = document.querySelector(".small-imageGallery");
    const bigGalleryElement = document.querySelector(".big-imageGallery");
    let smallImageGallery = null;

    if (smallGalleryElement) {
        smallImageGallery = new Swiper(smallGalleryElement, {
            slidesPerView: 4,
            spaceBetween: 18
        });
    }

    if (bigGalleryElement) {
        const bigGalleryOptions = { slidesPerView: 1 };
        if (smallImageGallery) {
            bigGalleryOptions.thumbs = { swiper: smallImageGallery };
        }
        new Swiper(bigGalleryElement, bigGalleryOptions);
    }

    const mobileGalleryElement = document.querySelector(".sm-imagesGallery");
    if (mobileGalleryElement) {
        const paginationElement = document.querySelector(".imagesGalleryPagination");
        new Swiper(mobileGalleryElement, {
            pagination: paginationElement ? {
                el: paginationElement,
                dynamicBullets: true
            } : undefined
        });
    }

    const relatedProductsElement = document.querySelector(".relate-Products");
    if (relatedProductsElement) {
        const prefersReducedMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        new Swiper(relatedProductsElement, {
            slidesPerView: "auto",
            loop: false,
            autoplay: prefersReducedMotion ? false : { delay: 3500, disableOnInteraction: true },
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 15 },
                768: { slidesPerView: 3, spaceBetween: 15 },
                1024: { slidesPerView: 4, spaceBetween: 15 },
                1440: { slidesPerView: 5, spaceBetween: 15 }
            }
        });
    }
});
