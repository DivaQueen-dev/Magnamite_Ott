//nav bar
window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
      navbar.style.background = "black"; 
  } else {
      navbar.style.background = "transparent"; 
  }
});
//carousel
function setupCarousel(container) {
    const carousel = container.querySelector('.movie-carousel');
    const leftArrow = container.querySelector('.nav-left');
    const rightArrow = container.querySelector('.nav-right');

    if (carousel && leftArrow && rightArrow) {
        const scrollAmount = 500;
        const scrollLeft = () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        const scrollRight = () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });

        rightArrow.onclick = scrollRight;
        leftArrow.onclick = scrollLeft;

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollLeft();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollRight();
            }
        });

        // Make carousel focusable
        carousel.setAttribute('tabindex', '0');
    }
}

// Apply carousel setup to all carousels
document.querySelectorAll('.carousel-container').forEach(setupCarousel);

//new
const images2 = document.querySelectorAll('.image2');
const prevBtn2 = document.getElementById('prevBtn2');
const nextBtn2 = document.getElementById('nextBtn2');

let position2 = 0;

const positions2 = [
  {x: -400, rotate: 30},
  {x: -200, rotate: 20},
  {x: 0, rotate: 0},
  {x: 200, rotate: -20},
  {x: 400, rotate: -30}
];

updateCarousel2();

const nextCarousel2 = () => {
  position2++;
  if (position2 >= images2.length) position2 = 0;
  updateCarousel2();
};

const prevCarousel2 = () => {
  position2--;
  if (position2 < 0) position2 = images2.length - 1;
  updateCarousel2();
};

nextBtn2.addEventListener('click', nextCarousel2);
prevBtn2.addEventListener('click', prevCarousel2);

// Keyboard navigation for top tier carousel
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    prevCarousel2();
  } else if (e.key === 'ArrowRight') {
    e.preventDefault();
    nextCarousel2();
  }
});

function updateCarousel2() {
  images2.forEach(img => img.classList.remove('center2'));
  
  images2.forEach((img, index) => {
    let pos = (index - position2) % images2.length;
    if (pos < 0) pos += images2.length;
    
    if (pos >= 0 && pos <= 4) {
      img.style.display = 'block';
      img.style.transform = `translateX(${positions2[pos].x}px) rotateY(${positions2[pos].rotate}deg)`;
      
      if (pos === 2) {
        img.classList.add('center2');
      }
    } else {
      img.style.display = 'none';
    }
  });
}
