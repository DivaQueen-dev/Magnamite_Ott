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

// Fade-in on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

fadeElements.forEach(el => fadeObserver.observe(el));

// Back to top button
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) {
    console.error("Back to top button not found");
    return;
  }

  window.addEventListener("scroll", () => {
    backToTopBtn.style.display =
      window.scrollY > 300 ? "block" : "none";
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});


// Navbar gradient on scroll
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});





