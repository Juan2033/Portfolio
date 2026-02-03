function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function descargarCV() {
  const cvUrl = "./assets/CV.pdf";
  window.open(cvUrl, "_blank");
}

/* ===============================
   Carrusel sin librerías (multi)
   =============================== */

function initCarousel(carouselEl) {
  const viewport = carouselEl.querySelector("[data-carousel-viewport]");
  const track = carouselEl.querySelector("[data-carousel-track]");
  const slides = Array.from(track.children);
  const prevBtn = carouselEl.querySelector("[data-carousel-prev]");
  const nextBtn = carouselEl.querySelector("[data-carousel-next]");
  const dotsWrap = carouselEl.querySelector("[data-carousel-dots]");

  let index = 0;
  let perView = 1;
  let step = 0;
  let maxIndex = 0;

  function desiredPerView() {
    const w = window.innerWidth;
    if (w >= 1100) return 3;
    if (w >= 700) return 2;
    return 1;
  }

  function getGapPx() {
    const style = window.getComputedStyle(track);
    const gap = style.gap || style.columnGap || "0px";
    return parseFloat(gap) || 0;
  }

  function layout() {
    if (slides.length === 0) return;

    // 👇 CLAVE: si hay 3 slides, NO permitimos perView=3 (lo bajamos a 2)
    const target = desiredPerView();
    const maxPerViewAllowed = Math.max(1, slides.length - 1); 
    perView = Math.min(target, maxPerViewAllowed);

    const gap = getGapPx();
    const viewportW = viewport.clientWidth;

    const slideW = (viewportW - gap * (perView - 1)) / perView;
    step = slideW + gap;

    slides.forEach((s) => {
      s.style.flex = `0 0 ${slideW}px`;
      s.style.width = `${slideW}px`;
    });

    maxIndex = Math.max(0, slides.length - perView);
    index = Math.min(index, maxIndex);

    buildDots();
    update();
    toggleControls();
  }

  function toggleControls() {
    const hasMove = maxIndex > 0;

    if (prevBtn) prevBtn.style.display = hasMove ? "" : "none";
    if (nextBtn) nextBtn.style.display = hasMove ? "" : "none";

    if (dotsWrap) dotsWrap.style.display = hasMove ? "flex" : "none";
  }

  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";

    const dotCount = maxIndex + 1;
    for (let i = 0; i < dotCount; i++) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel__dot" + (i === index ? " is-active" : "");
      b.setAttribute("aria-label", `Ir a ${i + 1}`);
      b.addEventListener("click", () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(b);
    }
  }

  function update() {
    track.style.transform = `translateX(-${index * step}px)`;

    if (prevBtn) prevBtn.disabled = index <= 0;
    if (nextBtn) nextBtn.disabled = index >= maxIndex;

    if (dotsWrap) {
      const dots = Array.from(dotsWrap.querySelectorAll(".carousel__dot"));
      dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
    }
  }

  function next() {
    index = Math.min(maxIndex, index + 1);
    update();
  }

  function prev() {
    index = Math.max(0, index - 1);
    update();
  }

  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Swipe en móvil
  let startX = 0;
  let dragging = false;

  viewport.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
      dragging = true;
    },
    { passive: true }
  );

  viewport.addEventListener("touchend", (e) => {
    if (!dragging) return;
    dragging = false;

    const endX = e.changedTouches[0].clientX;
    const delta = endX - startX;

    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
  });

  // Teclado
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  window.addEventListener("resize", layout);
  layout();
}

document.querySelectorAll("[data-carousel]").forEach(initCarousel);
