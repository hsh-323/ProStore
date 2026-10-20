$(document).ready(function () {
    if (typeof Swiper === "undefined") return;

    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headerSliderElement = document.querySelector(".header-Slider");
    if (headerSliderElement) {
        const paginationElement = headerSliderElement.querySelector(".imagesGalleryPagination") ||
            document.querySelector(".imagesGalleryPagination");
        new Swiper(headerSliderElement, {
            pagination: paginationElement ? {
                el: paginationElement,
                dynamicBullets: true
            } : undefined,
            autoplay: prefersReducedMotion ? false : { delay: 4000, disableOnInteraction: true },
            speed: prefersReducedMotion ? 0 : 400
        });
    }

    const selectedNewsElement = document.querySelector(".selected-news-slider");
    if (selectedNewsElement) {
        new Swiper(selectedNewsElement, {
            slidesPerView: "auto",
            loop: false,
            breakpoints: {
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 }
            }
        });
    }
});
