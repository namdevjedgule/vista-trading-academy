window.onload = function () {
  if (!window.location.hash) {
    window.location.hash = "home";
  }
};

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

  anchor.addEventListener("click", function (e) {

    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    const navbarHeight = document.querySelector("nav").offsetHeight;

    window.scrollTo({
      top: target.offsetTop - navbarHeight,
      behavior: "smooth"
    });

    navLinks.classList.remove("active");

  });

});

const track = document.getElementById("sliderTrack");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let index = 0;

function updateSlider() {

  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

}

nextBtn.addEventListener("click", () => {

  index++;

  if (index >= slides.length) {
    index = 0;
  }

  updateSlider();

});

prevBtn.addEventListener("click", () => {

  index--;

  if (index < 0) {
    index = slides.length - 1;
  }

  updateSlider();

});

dots.forEach((dot, i) => {

  dot.addEventListener("click", () => {

    index = i;
    updateSlider();

  });

});

/* Auto Slide */

setInterval(() => {

  index++;

  if (index >= slides.length) {
    index = 0;
  }

  updateSlider();

}, 4000);

let touchStartX = 0;

track.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {

  let touchEndX = e.changedTouches[0].clientX;

  if (touchStartX - touchEndX > 50) {
    nextBtn.click();
  }

  if (touchEndX - touchStartX > 50) {
    prevBtn.click();
  }

});

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }

  });

  navItems.forEach(link => {

    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }

  });

});

window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");

  if (window.scrollY > 50) {
    nav.style.background = "rgba(8,19,31,0.98)";
    nav.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
  } else {
    nav.style.background = "rgba(8,19,31,0.9)";
    nav.style.boxShadow = "none";
  }
});

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

const counters = document.querySelectorAll(".counter");

counters.forEach(counter => {

  const target = +counter.getAttribute("data-target");
  const suffix = counter.getAttribute("data-suffix") || "";

  const updateCounter = () => {

    const current = +counter.innerText.replace(suffix, "");

    const increment = target / 150;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment) + suffix;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target + suffix;
    }

  };

  updateCounter();

});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (name === "" || email === "" || message === "") {
    alert("Please fill all fields");
  } else {
    alert("Message sent successfully!");
  }
});

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");

let testimonialIndex = 0;

function slideTestimonials() {

  const cardWidth = testimonialCards[0].offsetWidth + 25;

  testimonialIndex++;

  if (testimonialIndex >= testimonialCards.length - 3) {
    testimonialIndex = 0;
  }

  testimonialTrack.style.transform =
    `translateX(-${testimonialIndex * cardWidth}px)`;

}

setInterval(slideTestimonials, 3000);

const images = document.querySelectorAll(".footer-gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const next = document.getElementById("next");
const prev = document.getElementById("prev");
const closeBtn = document.getElementById("closeBtn");

let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener("click", () => {
    currentIndex = index;
    showImage();
    lightbox.style.display = "flex";
  });
});

function showImage() {
  lightboxImg.src = images[currentIndex].src;
}

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
});

closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    next.click();
  }

  if (endX - startX > 50) {
    prev.click();
  }
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let firstName = document.getElementById("firstName").value.trim();
  let lastName = document.getElementById("lastName").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let subject = document.getElementById("subject").value.trim();

  if (firstName && lastName && email && phone && subject) {
    let whatsappNumber = "918669586311";

    let message = `Hello, I am *${firstName} ${lastName}*.\n📧 Email: ${email}\n📞 Phone: ${phone}\n📝 Subject: ${subject}`;

    let encodedMessage = encodeURIComponent(message);

    let whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  } else {
    alert("Please fill all fields.");
  }
});