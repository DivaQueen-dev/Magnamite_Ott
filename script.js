//nav bar
window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
      navbar.style.background = "black";
  } else {
      navbar.style.background = "transparent";
  }
});

// Load movies from JSON and populate carousels
async function loadMovies() {
    try {
        const response = await fetch('movies.json');
        const data = await response.json();

        // Map carousel titles to JSON keys
        const titleToKey = {
            'Featured Movies': 'featuredMovies',
            'TV Series': 'tvSeries',
            'Anime': 'anime',
            'Dubbed': 'dubbed',
            'Movies': 'movies',
            'For You': 'forYou'
        };

        // Populate each carousel
        document.querySelectorAll('.carousel-container').forEach(container => {
            const title = container.querySelector('.carousel-title').textContent.trim();
            const key = titleToKey[title];
            if (key && data[key]) {
                const carousel = container.querySelector('.movie-carousel');
                carousel.innerHTML = ''; // Clear existing content
                data[key].forEach(movie => {
                    const movieItem = document.createElement('div');
                    movieItem.className = 'movie-item';
                    movieItem.innerHTML = `
                        <img src="${movie.image}" alt="${movie.title}">
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <p class="movie-desc">${movie.description}</p>
                        </div>
                    `;
                    carousel.appendChild(movieItem);
                });
            }
        });
    } catch (error) {
        console.error('Error loading movies:', error);
    }
}

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

// Load movies and then setup carousels
loadMovies().then(() => {
    document.querySelectorAll('.carousel-container').forEach(setupCarousel);
});

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


const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

const savedTheme = localStorage.getItem("theme");


if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  icon.classList.replace("fa-moon", "fa-sun");
  toggleBtn.setAttribute("aria-pressed", "true");
}

toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  if (isDark) {
    icon.classList.replace("fa-moon", "fa-sun");
    localStorage.setItem("theme", "dark");
    toggleBtn.setAttribute("aria-pressed", "true");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
    localStorage.setItem("theme", "light");
    toggleBtn.setAttribute("aria-pressed", "false");
  }
});



