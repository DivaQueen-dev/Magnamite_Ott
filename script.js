// Movie data with genres
const movies = [
  { title: "Twilight", genre: ["Romance", "Fantasy"], img: "img/twilight.jpg" },
  { title: "John Wick", genre: ["Action"], img: "img/jhon-wick.jpg" },
  { title: "Aquaman", genre: ["Action", "Adventure", "Fantasy"], img: "img/17.jpg" },
  { title: "Stranger Things", genre: ["Sci-Fi", "Horror"], img: "img/stranger.jpg" },
  { title: "Oppenheimer", genre: ["Drama", "Biography"], img: "img/oppenheimer.webp" },
  { title: "Lord of the Rings", genre: ["Fantasy", "Adventure"], img: "img/lord.jpg" },
  { title: "Spider-Man", genre: ["Action", "Adventure"], img: "img/19.jpg" },
  { title: "Beetlejuice", genre: ["Comedy", "Fantasy"], img: "img/beetlejuice.jpg" },
  { title: "Due Date", genre: ["Comedy"], img: "img/10.jpg" },
  { title: "The Hangover", genre: ["Comedy"], img: "img/12.jpg" },
  { title: "The Crown", genre: ["Drama", "Biography"], img: "img/13.jpg" },
  { title: "Game of Thrones", genre: ["Fantasy", "Drama"], img: "img/14.jpg" },
  { title: "The Mandalorian", genre: ["Sci-Fi", "Action"], img: "img/15.jpg" },
  { title: "The Witcher", genre: ["Fantasy", "Action"], img: "img/16.jpg" },
  { title: "Breaking Bad", genre: ["Crime", "Drama"], img: "img/17.jpg" },
  { title: "The Boys", genre: ["Action", "Sci-Fi"], img: "img/19.jpg" },
  { title: "Shadow and Bone", genre: ["Fantasy", "Adventure"], img: "img/shadow.jpg" },
  { title: "The Umbrella Academy", genre: ["Sci-Fi", "Comedy"], img: "img/wicked.jpg" },
  { title: "The Shawshank Redemption", genre: ["Drama"], img: "img/10.jpg" },
  { title: "Friends", genre: ["Comedy"], img: "img/12.jpg" },
  { title: "Attack on Titan", genre: ["Action", "Fantasy"], img: "img/18.jpg" },
  { title: "One Punch Man", genre: ["Action", "Comedy"], img: "img/one-punch-man.jpg" },
  { title: "Jujutsu Kaisen", genre: ["Action", "Fantasy"], img: "img/jujutsu.jpeg" },
  { title: "Spy x Family", genre: ["Comedy", "Action"], img: "img/spy-x-family.webp" },
  { title: "Naruto", genre: ["Action", "Adventure"], img: "img/11.jpg" },
  { title: "Death Note", genre: ["Thriller", "Mystery"], img: "img/12.jpg" },
  { title: "My Hero Academia", genre: ["Action", "Superhero"], img: "img/19.jpg" },
  { title: "Demon Slayer", genre: ["Action", "Fantasy"], img: "img/15.jpg" },
  { title: "Fullmetal Alchemist", genre: ["Fantasy", "Adventure"], img: "img/10.jpg" },
  { title: "Dragon Ball", genre: ["Action", "Adventure"], img: "img/7.jpg" },
  { title: "Inception", genre: ["Sci-Fi", "Thriller"], img: "img/18.jpg" },
  { title: "Wonka", genre: ["Fantasy", "Comedy"], img: "img/wonka.jpeg" },
  { title: "The Hunger Games", genre: ["Action", "Sci-Fi"], img: "img/hunger.jpeg" },
  { title: "Jurassic World", genre: ["Action", "Adventure"], img: "img/jurasic world.webm" }, // Note: This is a video, but treating as movie
  { title: "The Wolf of Wall Street", genre: ["Biography", "Crime"], img: "img/money.webp" },
  { title: "Dune", genre: ["Sci-Fi", "Adventure"], img: "img/dune.jpg" },
  { title: "Interstellar", genre: ["Sci-Fi", "Drama"], img: "img/5.jpg" },
  { title: "The Dark Knight", genre: ["Action", "Crime"], img: "img/8.jpg" }
];

// localStorage functions for watched movies
function getWatchedMovies() {
  const watched = localStorage.getItem('watchedMovies');
  return watched ? JSON.parse(watched) : [];
}

function saveWatchedMovie(movieTitle) {
  const watched = getWatchedMovies();
  if (!watched.includes(movieTitle)) {
    watched.push(movieTitle);
    localStorage.setItem('watchedMovies', JSON.stringify(watched));
  }
}

// Recommendation logic
function getRecommendations() {
  const watched = getWatchedMovies();
  if (watched.length === 0) {
    // Fallback for new users: show popular movies
    return movies.slice(0, 10);
  }

  const watchedGenres = [];
  watched.forEach(title => {
    const movie = movies.find(m => m.title === title);
    if (movie) {
      watchedGenres.push(...movie.genre);
    }
  });

  // Count genre frequencies
  const genreCount = {};
  watchedGenres.forEach(genre => {
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  // Sort genres by frequency
  const sortedGenres = Object.keys(genreCount).sort((a, b) => genreCount[b] - genreCount[a]);

  // Recommend movies based on top genres, excluding watched ones
  const recommendations = [];
  sortedGenres.forEach(genre => {
    const genreMovies = movies.filter(m => m.genre.includes(genre) && !watched.includes(m.title));
    recommendations.push(...genreMovies);
  });

  // Remove duplicates and limit to 10
  const uniqueRecommendations = [];
  const seen = new Set();
  recommendations.forEach(movie => {
    if (!seen.has(movie.title)) {
      seen.add(movie.title);
      uniqueRecommendations.push(movie);
    }
  });

  return uniqueRecommendations.slice(0, 10);
}

// Function to update "For You" carousel
function updateForYouCarousel() {
  const recommendations = getRecommendations();
  const forYouContainer = document.querySelector('.carousel-container h2[id="for-you"]')?.parentElement;
  if (!forYouContainer) return;

  const carousel = forYouContainer.querySelector('.movie-carousel');
  if (!carousel) return;

  carousel.innerHTML = ''; // Clear existing

  recommendations.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.className = 'movie-item';
    movieItem.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}">
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-desc">Genres: ${movie.genre.join(', ')}</p>
        <button class="mark-watched-btn" data-title="${movie.title}">Mark as Watched</button>
      </div>
    `;
    carousel.appendChild(movieItem);
  });

  // Add event listeners to new buttons
  carousel.querySelectorAll('.mark-watched-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      saveWatchedMovie(title);
      this.textContent = 'Watched';
      this.disabled = true;
      // Update recommendations after marking as watched
      setTimeout(updateForYouCarousel, 100);
    });
  });
}

//nav bar
window.addEventListener("scroll", function() {
  var navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
      navbar.style.background = "black";
  } else {
      navbar.style.background = "transparent";
  }
});

// Video Controls
const video = document.getElementById('hero-video');
const playPauseBtn = document.getElementById('play-pause-btn');
const muteBtn = document.getElementById('mute-btn');
const volumeSlider = document.getElementById('volume-slider');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const videoControls = document.getElementById('video-controls');

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    video.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
});

// Mute/Unmute functionality
muteBtn.addEventListener('click', () => {
  if (video.muted) {
    video.muted = false;
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeSlider.value = video.volume;
  } else {
    video.muted = true;
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeSlider.value = 0;
  }
});

// Volume slider functionality
volumeSlider.addEventListener('input', () => {
  video.volume = volumeSlider.value;
  if (video.volume === 0) {
    muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  }
  video.muted = false;
});

// Fullscreen functionality
fullscreenBtn.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    video.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
  }
});

// Show controls on video interaction (for mobile)
video.addEventListener('touchstart', () => {
  videoControls.style.opacity = '1';
  setTimeout(() => {
    videoControls.style.opacity = '0';
  }, 3000);
});

// Hide controls when video is playing and mouse is not hovering
let hideControlsTimeout;
function hideControls() {
  if (!video.paused) {
    hideControlsTimeout = setTimeout(() => {
      videoControls.style.opacity = '0';
    }, 3000);
  }
}

video.addEventListener('play', hideControls);
video.addEventListener('pause', () => {
  clearTimeout(hideControlsTimeout);
  videoControls.style.opacity = '1';
});

video.addEventListener('mouseenter', () => {
  clearTimeout(hideControlsTimeout);
  videoControls.style.opacity = '1';
});

video.addEventListener('mouseleave', hideControls);
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

// Function to add "Mark as Watched" buttons to all movie items
function addWatchedButtons() {
  document.querySelectorAll('.movie-item').forEach(item => {
    const img = item.querySelector('img');
    const info = item.querySelector('.movie-info');
    if (img && info && !info.querySelector('.mark-watched-btn')) {
      const title = info.querySelector('.movie-title')?.textContent || img.alt;
      const btn = document.createElement('button');
      btn.className = 'mark-watched-btn';
      btn.setAttribute('data-title', title);
      btn.textContent = 'Mark as Watched';
      info.appendChild(btn);
    }
  });

  // Add event listeners
  document.querySelectorAll('.mark-watched-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const title = this.getAttribute('data-title');
      saveWatchedMovie(title);
      this.textContent = 'Watched';
      this.disabled = true;
      // Update recommendations after marking as watched
      setTimeout(updateForYouCarousel, 100);
    });
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  addWatchedButtons();
  updateForYouCarousel();
});
