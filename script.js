function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

function descargarCV() {
    const link = document.createElement('a');
    link.href = './assets/CV_Juan_Ballesteros.pdf';
    link.download = 'CV_Juan_Ballesteros.pdf';
    link.click();
}

const swiper = new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        
        // Paginación
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        
        // Navegación con flechas
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        
        // Responsive breakpoints
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      });