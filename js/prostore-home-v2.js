(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function readCart() {
    try {
      const value = JSON.parse(localStorage.getItem("prostore-cart-v2") || "[]");
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function updateCartBadge() {
    const count = readCart().reduce((sum, item) => sum + Math.max(1, Number(item.quantity) || 1), 0);
    $$("[data-cart-count]").forEach(node => { node.textContent = String(count); });
  }

  let toastTimer = 0;
  function toast(message) {
    const node = $("#site-toast");
    if (!node) return;
    node.textContent = message;
    node.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => node.classList.remove("show"), 2400);
  }

  function initHero() {
    const hero = $(".hero");
    if (!hero) return;
    const slides = $$(".hero-slide", hero);
    const dots = $$(".hero-dot", hero);
    if (slides.length < 2) return;
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let current = Math.max(0, slides.findIndex(slide => slide.classList.contains("is-active")));
    let timer = 0;

    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const active = i === current;
        slide.classList.toggle("is-active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach((dot, i) => {
        const active = i === current;
        dot.classList.toggle("is-active", active);
        if (active) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    };

    const stop = () => window.clearInterval(timer);
    const start = () => {
      stop();
      if (!reducedMotion) timer = window.setInterval(() => show(current + 1), 5000);
    };

    $(".hero-arrow.prev", hero)?.addEventListener("click", () => { show(current - 1); start(); });
    $(".hero-arrow.next", hero)?.addEventListener("click", () => { show(current + 1); start(); });
    dots.forEach((dot, i) => dot.addEventListener("click", () => { show(i); start(); }));
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    hero.addEventListener("focusin", stop);
    hero.addEventListener("focusout", start);
    document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
    show(current);
    start();
  }

  function initRails() {
    $$("[data-scroll-rail]").forEach(button => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.dataset.scrollRail);
        if (!target) return;
        const direction = button.dataset.direction === "next" ? -1 : 1;
        target.scrollBy({ left: direction * Math.max(240, target.clientWidth * 0.72), behavior: "smooth" });
      });
    });
  }

  function initCart() {
    updateCartBadge();
    document.addEventListener("click", event => {
      const button = event.target.closest("[data-add-to-cart]");
      if (!button) return;
      event.preventDefault();
      const id = String(button.dataset.productId || "");
      if (!id) return;
      const cart = readCart();
      const found = cart.find(item => String(item.id) === id);
      if (found) found.quantity = (Number(found.quantity) || 1) + 1;
      else cart.push({
        id,
        title: button.dataset.productTitle || "محصول",
        price: Number(button.dataset.productPrice) || 0,
        image: button.dataset.productImage || "",
        quantity: 1
      });
      try {
        localStorage.setItem("prostore-cart-v2", JSON.stringify(cart));
        updateCartBadge();
        toast("به سبد خرید اضافه شد");
      } catch (_) {
        toast("مرورگر اجازه ذخیره سبد خرید را نداد");
      }
    });
  }

  function initSearch() {
    $$("[data-site-search]").forEach(form => {
      form.addEventListener("submit", event => {
        const input = $("input[name='q']", form);
        const value = input ? input.value.trim() : "";
        if (!value) {
          event.preventDefault();
          input?.focus();
          toast("نام کالا یا برند را وارد کن");
          return;
        }
        event.preventDefault();
        window.location.href = "search.html?q=" + encodeURIComponent(value);
      });
    });
  }

  function initMobileMenu() {
    const button = $(".mobile-menu-btn");
    const nav = $(".nav-wrap");
    if (!button || !nav) return;
    button.addEventListener("click", () => {
      const opened = nav.classList.toggle("mobile-open");
      button.setAttribute("aria-expanded", opened ? "true" : "false");
      button.setAttribute("aria-label", opened ? "بستن منو" : "باز کردن منو");
      button.textContent = opened ? "×" : "☰";
    });
    $$(".nav-link", nav).forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("mobile-open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
    }));
  }

  function initNewsletter() {
    const form = $("#newsletter-form");
    if (!form) return;
    form.addEventListener("submit", event => {
      event.preventDefault();
      const input = $("input[type='email']", form);
      if (!input || !input.checkValidity()) {
        input?.reportValidity();
        return;
      }
      toast("در نسخه نمایشی، عضویت خبرنامه به سرویس ارسال متصل نیست");
      input.value = "";
    });
  }

  function initBackToTop() {
    $$(".back-top").forEach(button => button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHero();
    initRails();
    initCart();
    initSearch();
    initMobileMenu();
    initNewsletter();
    initBackToTop();
  });
})();