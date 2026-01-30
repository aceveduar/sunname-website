// =============================
// SECCIÓN HERO: Video demo solo al hacer clic en el badge
// =============================
const heroImage = document.getElementById("odoo-hero-img");
const heroVideo = document.getElementById("odoo-hero-video");
const demoBtn = document.querySelector(".odoo-hero__version-badge");

if (demoBtn && heroImage && heroVideo) {
  demoBtn.style.cursor = "pointer";
  demoBtn.addEventListener("click", function () {
    heroImage.classList.add("u-hidden");
    heroVideo.classList.remove("u-hidden");
    heroVideo.currentTime = 0;
    heroVideo.play();
    if (document.getElementById("odoo-hero-play-btn")) {
      document.getElementById("odoo-hero-play-btn").style.display = "none";
    }
  });
  heroVideo.addEventListener("ended", function () {
    heroVideo.classList.add("u-hidden");
    heroImage.classList.remove("u-hidden");
    if (document.getElementById("odoo-hero-play-btn")) {
      document.getElementById("odoo-hero-play-btn").style.display = "";
    }
  });
}

// SECCIÓN 7: Animación de entrada de elementos al hacer scroll (Intersection Observer)
// Se utiliza Intersection Observer para añadir una clase a los elementos cuando entran en el viewport.
const elementsToAnimate = document.querySelectorAll(".sun-animate-on-scroll");

const animateObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("sun-animated");
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  },
  {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of the element is visible
  },
);

elementsToAnimate.forEach((element) => {
  animateObserver.observe(element);
});
