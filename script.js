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
