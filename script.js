//nav bar
window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
      navbar.style.background = "rgba(0,0,0,0.6)"; 
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
        rightArrow.onclick = () => carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        leftArrow.onclick = () => carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
}

// Apply carousel setup to all carousels
document.querySelectorAll('.carousel-container').forEach(setupCarousel);

// 🔍 Search movies
const searchInput = document.getElementById("searchInput");
const movies = document.querySelectorAll(".movie-item");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();
    movies.forEach(movie => {
      const title = movie.querySelector(".movie-title").innerText.toLowerCase();
      movie.style.display = title.includes(value) ? "block" : "none";
    });
  });
}


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

nextBtn2.addEventListener('click', function() {
  position2++;
  if (position2 >= images2.length) position2 = 0;
  updateCarousel2();
});

prevBtn2.addEventListener('click', function() {
  position2--;
  if (position2 < 0) position2 = images2.length - 1;
  updateCarousel2();
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

// ✨ Fade-in on scroll
const fadeElements = document.querySelectorAll('.fade-in');

window.addEventListener('scroll', () => {
  fadeElements.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('show');
    }
  });
});
