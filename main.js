// JCC Incorporated site scripts. Vanilla JS, no dependencies.
(function () {
  "use strict";

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  function onScroll() { header && header.classList.toggle("scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Full-width drop sheet; notch toggle moves to the sheet's bottom edge when open
  var toggle = document.querySelector(".menu-toggle");
  var sheet = document.getElementById("menu");
  function setMenu(open) {
    document.body.classList.toggle("menu-open", open);
    if (toggle) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
  }
  if (toggle) toggle.addEventListener("click", function () {
    setMenu(!document.body.classList.contains("menu-open"));
  });
  if (sheet) sheet.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("click", function (e) {
    if (!document.body.classList.contains("menu-open")) return;
    if (sheet && !sheet.contains(e.target) && toggle && !toggle.contains(e.target)) setMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setMenu(false); toggle && toggle.focus(); }
  });

  // Scroll-triggered reveals
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Project carousel arrows (desktop; swipe works on mobile)
  var carousel = document.querySelector(".carousel");
  var prev = document.querySelector(".car-btn.prev");
  var next = document.querySelector(".car-btn.next");
  function step(dir) {
    if (!carousel) return;
    var slide = carousel.querySelector(".slide");
    var amount = slide ? slide.offsetWidth + 16 : carousel.clientWidth;
    carousel.scrollBy({ left: dir * amount, behavior: "smooth" });
  }
  prev && prev.addEventListener("click", function () { step(-1); });
  next && next.addEventListener("click", function () { step(1); });

  // Contact form: validation and submission
  var form = document.getElementById("contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (field) {
        var valid = field.value.trim() !== "";
        if (field.type === "email" && valid) valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        field.classList.toggle("invalid", !valid);
        if (!valid) ok = false;
      });
      if (!ok) { status.className = "form-status err"; status.textContent = "Please complete the required fields."; return; }

      var endpoint = form.dataset.endpoint;
      if (!endpoint) {
        // No form service connected yet. See README for setup.
        status.className = "form-status err";
        status.textContent = "The form is not connected yet. Please call 925-370-6067 or email nbreeden@jccincorporated.com.";
        return;
      }
      var data = new FormData(form);
      status.className = "form-status";
      status.textContent = "Sending...";
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("Request failed");
          form.reset();
          status.className = "form-status ok";
          status.textContent = "Thank you. Your message has been sent.";
        })
        .catch(function () {
          status.className = "form-status err";
          status.textContent = "Sorry, your message could not be sent. Please call 925-370-6067.";
        });
    });
  }
})();
